import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import BlogDetail from '../../components/Blog/BlogDetail.jsx';

const BlogDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Fixed Navbar - Responsive height offset */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      {/* Main Content - Perfect responsive spacing */}
      <main className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-20">
        <div className="mx-auto max-w-2xl sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
            <BlogDetail 
              postId={postId} 
              onBack={() => navigate('/blog')} 
            />
          </section>
        </div>

        {/* Footer - Responsive spacing */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default BlogDetailPage;
