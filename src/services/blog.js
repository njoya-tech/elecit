// src/service/blog.js
import { directus } from "./api/directus";
import { readItems, readItem, updateItem } from "@directus/sdk";

/**
 * Get asset URL from Directus file ID
 */
export const getAssetUrl = (fileId) => {
  if (!fileId) return null;
  return `${import.meta.env.VITE_DIRECTUS_URL}/assets/${fileId}`;
};

/**
 * Common fields for blog post queries
 * Adjust these based on your actual Directus schema
 */
const POST_FIELDS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "content",
  "cover_image",
  "created_at",
  "views",
  "likes",
  "comments_count",
  "author.id",
  "author.full_name",
  "author.avatar",
  "category.id",
  "category.name",
  "category.slug",
  "translations.id",
  "translations.languages_code.id", // include the relation ID
  "translations.languages_code.code", // critical: this must be here
  "translations.languages_code.name",
  "translations.title",
  "translations.excerpt",
  "translations.content",
];

/**
 * Fetch all blog posts
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category name (optional)
 * @param {number} options.limit - Number of posts to fetch (default: 100)
 * @param {number} options.offset - Pagination offset (default: 0)
 * @param {string} options.sort - Sort field (default: '-created_at')
 * @param {string} options.search - Search query (optional)
 * @returns {Promise<Array>} Array of blog posts
 */
export const fetchAllPosts = async (options = {}) => {
  const {
    category = null,
    limit = 100,
    offset = 0,
    sort = "-created_at",
    search = null,
  } = options;

  try {
    const filter = { _and: [] };

    // Filter by category
    if (category && category !== "Tous les postes") {
      filter._and.push({
        category: {
          name: { _eq: category },
        },
      });
    }

    // Search filter
    if (search) {
      filter._and.push({
        _or: [
          { title: { _contains: search } },
          { excerpt: { _contains: search } },
          { content: { _contains: search } },
        ],
      });
    }

    // Remove _and if empty
    const finalFilter = filter._and.length > 0 ? filter : undefined;

    const posts = await directus.request(
      readItems("blog_post", {
        fields: POST_FIELDS,
        ...(finalFilter && { filter: finalFilter }),
        sort: [sort],
        limit,
        offset,
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

/**
 * Fetch posts by category
 * @param {string} categoryName - Category name to filter by
 * @param {Object} options - Additional query options
 * @returns {Promise<Array>} Array of blog posts
 */
export const fetchPostsByCategory = async (categoryName, options = {}) => {
  return fetchAllPosts({ ...options, category: categoryName });
};

/**
 * Fetch featured posts
 * @param {number} limit - Number of featured posts (default: 3)
 * @returns {Promise<Array>} Array of featured posts
 */
export const fetchFeaturedPosts = async (limit = 3) => {
  try {
    const posts = await directus.request(
      readItems("blog_post", {
        fields: POST_FIELDS,
        filter: {
          featured: { _eq: true },
        },
        sort: ["-created_at"],
        limit,
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};

/**
 * Fetch featured post for a category
 * @param {string} categoryName - Category name
 * @returns {Promise<Object|null>} Featured post or null
 */
export const fetchFeaturedPost = async (categoryName) => {
  try {
    const posts = await fetchAllPosts({
      category: categoryName,
      limit: 1,
      sort: "-created_at",
    });

    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching featured post:", error);
    return null;
  }
};

/**
 * Fetch single blog post by ID
 * @param {string|number} postId - Post ID
 * @returns {Promise<Object>} Blog post object
 */
export const fetchPostById = async (postId) => {
  try {
    const post = await directus.request(
      readItem("blog_post", postId, {
        fields: POST_FIELDS,
      })
    );

    return post;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

/**
 * Fetch single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Blog post object or null
 */
export const fetchPostBySlug = async (slug) => {
  try {
    const posts = await directus.request(
      readItems("blog_post", {
        fields: POST_FIELDS,
        filter: {
          slug: { _eq: slug },
        },
        limit: 1,
      })
    );

    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw error;
  }
};

/**
 * Fetch related posts based on category
 * @param {string|number} postId - Current post ID
 * @param {string|number} categoryId - Category ID
 * @param {number} limit - Number of related posts (default: 3)
 * @returns {Promise<Array>} Array of related posts
 */
export const fetchRelatedPosts = async (postId, categoryId, limit = 3) => {
  try {
    const posts = await directus.request(
      readItems("blog_post", {
        fields: POST_FIELDS,
        filter: {
          _and: [
            { id: { _neq: postId } },
            { category: { id: { _eq: categoryId } } },
          ],
        },
        sort: ["-created_at"],
        limit,
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
};

/**
 * Fetch all categories with post counts
 * @returns {Promise<Array>} Array of categories
 */
export const fetchCategories = async () => {
  try {
    const categories = await directus.request(
      readItems("blog_categories", {
        fields: ["id", "name", "slug", "description", "icon", "color"],
        sort: ["name"],
      })
    );

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Fetch popular posts (by views or likes)
 * @param {number} limit - Number of posts (default: 5)
 * @param {string} sortBy - Sort by 'views' or 'likes' (default: 'views')
 * @returns {Promise<Array>} Array of popular posts
 */
export const fetchPopularPosts = async (limit = 5, sortBy = "views") => {
  try {
    const posts = await directus.request(
      readItems("blog_post", {
        fields: POST_FIELDS,
        sort: [`-${sortBy}`],
        limit,
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
};

/**
 * Increment post views
 * @param {string|number} postId - Post ID
 * @returns {Promise<boolean>} Success status
 */
export const incrementPostViews = async (postId) => {
  try {
    // This would require a custom endpoint or update permission
    // Example implementation (adjust based on your Directus setup)
    await directus.request(
      updateItem("blog_post", postId, {
        views: { _increment: 1 },
      })
    );
    return true;
  } catch (error) {
    console.error("Error incrementing views:", error);
    return false;
  }
};

/**
 * Get translated content for a post
 * @param {Object} post - Blog post object with translations
 * @param {string} languageCode - Language code (e.g., 'en', 'fr')
 * @returns {Object} Post with translated content or original if translation not found
 */
export const getTranslation = (post, languageCode) => {
  if (!post) return post;

  // If no translations exist, return the original post
  if (!post.translations) return post;

  // Normalize translations to always be an array
  // Directus might return a single object instead of an array
  const translations = Array.isArray(post.translations)
    ? post.translations
    : [post.translations];

  console.log("Normalized translations:", translations);

  // Debug: Check what languages_code actually contains
  if (translations.length > 0) {
    console.log(
      "First translation languages_code:",
      translations[0].languages_code
    );
    console.log(
      "Type of languages_code:",
      typeof translations[0].languages_code
    );
  }

  if (translations.length === 0) return post;

  // Find translation matching the requested language
  const translation = translations.find((t) => {
    // Handle three possible structures for languages_code:
    // 1. Direct string: "en"
    // 2. Nested object: {code: "en", name: "English"}
    // 3. Just the code property: could be anywhere in the object
    const langCode =
      typeof t.languages_code === "string"
        ? t.languages_code // Direct string
        : t.languages_code?.code || // Nested object
          t.languages_code?.id || // ID reference
          null;

    console.log("Comparing:", langCode, "with requested:", languageCode);
    return langCode === languageCode;
  });

  console.log("Found translation:", translation);

  if (!translation) {
    console.log(
      "No translation found for",
      languageCode,
      "- returning original"
    );
    return post;
  }

  // Return the post with translated content
  return {
    ...post,
    title: translation.title || post.title,
    excerpt: translation.excerpt || post.excerpt,
    content: translation.content || post.content,
  };
};
