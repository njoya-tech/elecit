import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import BlogDetail from '../../components/Blog/BlogDetail.jsx';

const BlogDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="w-full pt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <section className="pt-20">
            <BlogDetail 
              postId={postId} 
              onBack={() => navigate('/blog')} 
            />
          </section>
        </div>

        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
}

export default BlogDetailPage