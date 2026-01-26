const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;

const execAsync = promisify(exec);

const PAGES = [
  { name: 'Home', url: 'http://localhost:3000/' },
  { name: 'Entreprise', url: 'http://localhost:3000/entreprise' },
  { name: 'Data Processing', url: 'http://localhost:3000/data-processing' },
  { name: 'Control Access', url: 'http://localhost:3000/control-access' },
  { name: 'Bureau Etude', url: 'http://localhost:3000/bureau-etude' },
  { name: 'SAV', url: 'http://localhost:3000/sav' },
  { name: 'Contact', url: 'http://localhost:3000/contact' },
];

const PERFORMANCE_THRESHOLDS = {
  FCP: 1800, // First Contentful Paint (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  TTI: 3800, // Time to Interactive (ms)
};

async function measurePage(page) {
  console.log(`\n📊 Measuring: ${page.name}`);
  
  try {
    const { stdout } = await execAsync(
      `npx lighthouse ${page.url} --output=json --quiet --chrome-flags="--headless"`
    );
    
    const report = JSON.parse(stdout);
    const metrics = report.audits;
    
    const results = {
      page: page.name,
      performance: report.categories.performance.score * 100,
      accessibility: report.categories.accessibility.score * 100,
      bestPractices: report.categories['best-practices'].score * 100,
      seo: report.categories.seo.score * 100,
      metrics: {
        FCP: metrics['first-contentful-paint'].numericValue,
        LCP: metrics['largest-contentful-paint'].numericValue,
        CLS: metrics['cumulative-layout-shift'].numericValue,
        TBT: metrics['total-blocking-time'].numericValue,
        SI: metrics['speed-index'].numericValue,
      },
    };
    
    return results;
  } catch (error) {
    console.error(`❌ Error measuring ${page.name}:`, error.message);
    return null;
  }
}

function checkThresholds(results) {
  const issues = [];
  
  if (results.metrics.FCP > PERFORMANCE_THRESHOLDS.FCP) {
    issues.push(`⚠️  FCP too slow: ${results.metrics.FCP}ms (target: ${PERFORMANCE_THRESHOLDS.FCP}ms)`);
  }
  
  if (results.metrics.LCP > PERFORMANCE_THRESHOLDS.LCP) {
    issues.push(`⚠️  LCP too slow: ${results.metrics.LCP}ms (target: ${PERFORMANCE_THRESHOLDS.LCP}ms)`);
  }
  
  if (results.metrics.CLS > PERFORMANCE_THRESHOLDS.CLS) {
    issues.push(`⚠️  CLS too high: ${results.metrics.CLS} (target: ${PERFORMANCE_THRESHOLDS.CLS})`);
  }
  
  if (results.performance < 85) {
    issues.push(`⚠️  Performance score too low: ${results.performance} (target: 85)`);
  }
  
  return issues;
}

async function generateReport(allResults) {
  const timestamp = new Date().toISOString();
  
  let report = `# Performance Test Report\n`;
  report += `Generated: ${timestamp}\n\n`;
  
  report += `## Summary\n\n`;
  report += `| Page | Performance | Accessibility | Best Practices | SEO |\n`;
  report += `|------|-------------|---------------|----------------|-----|\n`;
  
  allResults.forEach(result => {
    if (result) {
      report += `| ${result.page} | ${result.performance.toFixed(0)} | ${result.accessibility.toFixed(0)} | ${result.bestPractices.toFixed(0)} | ${result.seo.toFixed(0)} |\n`;
    }
  });
  
  report += `\n## Detailed Metrics\n\n`;
  
  allResults.forEach(result => {
    if (result) {
      report += `### ${result.page}\n\n`;
      report += `**Core Web Vitals:**\n`;
      report += `- FCP: ${result.metrics.FCP.toFixed(0)}ms\n`;
      report += `- LCP: ${result.metrics.LCP.toFixed(0)}ms\n`;
      report += `- CLS: ${result.metrics.CLS.toFixed(3)}\n`;
      report += `- TBT: ${result.metrics.TBT.toFixed(0)}ms\n`;
      report += `- Speed Index: ${result.metrics.SI.toFixed(0)}ms\n\n`;
      
      const issues = checkThresholds(result);
      if (issues.length > 0) {
        report += `**Issues Found:**\n`;
        issues.forEach(issue => {
          report += `${issue}\n`;
        });
      } else {
        report += `✅ All metrics pass thresholds\n`;
      }
      report += `\n---\n\n`;
    }
  });
  
  await fs.writeFile('performance-report.md', report);
  console.log('\n📄 Report saved to: performance-report.md');
}

async function main() {
  console.log('🚀 Starting Performance Testing...\n');
  console.log('⚠️  Make sure your dev server is running on http://localhost:3000\n');
  
  const allResults = [];
  
  for (const page of PAGES) {
    const result = await measurePage(page);
    if (result) {
      allResults.push(result);
      
      console.log(`✅ ${page.name}: Performance ${result.performance.toFixed(0)}/100`);
      
      const issues = checkThresholds(result);
      if (issues.length > 0) {
        issues.forEach(issue => console.log(`   ${issue}`));
      }
    }
  }
  
  await generateReport(allResults);
  
  console.log('\n✨ Performance testing complete!');
  
  // Exit with error if any page fails thresholds
  const hasIssues = allResults.some(result => 
    result.performance < 85 || 
    result.metrics.FCP > PERFORMANCE_THRESHOLDS.FCP ||
    result.metrics.LCP > PERFORMANCE_THRESHOLDS.LCP
  );
  
  if (hasIssues) {
    console.log('\n⚠️  Some pages failed performance thresholds');
    process.exit(1);
  }
}

main().catch(console.error);