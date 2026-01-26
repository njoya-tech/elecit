
import { directus } from "./api/directus";
import { readItems, readItem, updateItem, createItem } from "@directus/sdk";

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
 * 
 */

const POST_FIELDS = [
  "id",
  "slug",
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
  // Translation fields with expanded language relation
  "translations.id",
  "translations.blog_post_id",
  "translations.title",
  "translations.excerpt",
  "translations.content",
  "translations.languages_id.id",      // ✅ Add these three lines
  "translations.languages_id.code",    // ✅ This is crucial for language matching
  "translations.languages_id.name",    // ✅ Optional but useful
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
      { slug: { _contains: search } },
      { translations: { title: { _contains: search } } },
      { translations: { excerpt: { _contains: search } } },
      { translations: { content: { _contains: search } } },
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
 * @param {string} languageCode - Language code (e.g., 'en', 'fr', 'de')
 * @returns {Object} Post with translated content or original if translation not found
 */
export const getTranslation = (post, languageCode) => {
  if (!post || !post.translations || post.translations.length === 0) {
    return post;
  }

  const translations = Array.isArray(post.translations)
    ? post.translations
    : [post.translations];

  console.log(`Looking for translation with code: "${languageCode}"`);
  console.log("Available translations:", translations);

  // Find translation matching the requested language
  const translation = translations.find((t) => {
    const langCode = t.languages_id?.code;
    console.log(`Comparing: "${langCode}" === "${languageCode}"`, langCode === languageCode);
    return langCode === languageCode;
  });

  if (!translation) {
    console.log(`No translation found for "${languageCode}"`);
    // Return first translation as fallback, or the post as-is
    return translations.length > 0 
      ? { ...post, title: translations[0].title, excerpt: translations[0].excerpt, content: translations[0].content }
      : post;
  }

  console.log(`✅ Found translation:`, translation);

  // Return the post with translated content
  return {
    ...post,
    title: translation.title,
    excerpt: translation.excerpt,
    content: translation.content,
  };
};

/**
 * Fetch comments for a specific blog post
 * @param {string|number} blogPostId - Blog post ID
 * @returns {Promise<Array>} Array of comments
 */
export const fetchComments = async (blogPostId) => {
  try {
    const comments = await directus.request(
      readItems("comments", {
        fields: [
          "id",
          "author_name",
          "author_email",
          "comment_text",
          "created_at",
          "status",
        ],
        filter: {
          _and: [
            { blog_post: { _eq: blogPostId } },
            { status: { _eq: "published" } },
          ],
        },
        sort: ["-created_at"],
      })
    );

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

/**
 * Submit a new comment
 * @param {string|number} blogPostId - Blog post ID
 * @param {Object} commentData - Comment data
 * @param {string} commentData.author_name - Commenter's name
 * @param {string} commentData.author_email - Commenter's email
 * @param {string} commentData.comment_text - Comment text
 * @returns {Promise<Object>} Created comment
 */
export const submitComment = async (blogPostId, commentData) => {
  try {
    // Create the comment with status 'draft' for moderation
    const comment = await directus.request(
      createItem("comments", {
        blog_post: blogPostId,
        author_name: commentData.author_name,
        author_email: commentData.author_email,
        comment_text: commentData.comment_text,
        status: "draft", // Set to 'draft' for moderation
        created_at: new Date().toISOString(),
      })
    );

    // Increment comment count in blog post
    await incrementCommentCount(blogPostId);

    return comment;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

/**
 * Increment comment count for a blog post
 * @param {string|number} blogPostId - Blog post ID
 * @returns {Promise<boolean>} Success status
 */
const incrementCommentCount = async (blogPostId) => {
  try {
    // First fetch current count
    const post = await directus.request(
      readItem("blog_post", blogPostId, {
        fields: ["comments_count"],
      })
    );

    const currentCount = post.comments_count || 0;

    // Update with incremented count
    await directus.request(
      updateItem("blog_post", blogPostId, {
        comments_count: currentCount + 1,
      })
    );

    return true;
  } catch (error) {
    console.error("Error incrementing comment count:", error);
    return false;
  }
};

/**
 * Increment view count for a blog post
 * @param {string|number} blogPostId - Blog post ID
 * @returns {Promise<boolean>} Success status
 */
export const incrementViewCount = async (blogPostId) => {
  try {
    // First fetch current count
    const post = await directus.request(
      readItem("blog_post", blogPostId, {
        fields: ["views"],
      })
    );

    const currentViews = post.views || 0;

    // Update with incremented count
    await directus.request(
      updateItem("blog_post", blogPostId, {
        views: currentViews + 1,
      })
    );

    return true;
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return false;
  }
};

/**
 * Toggle like for a blog post (like/unlike)
 * @param {string|number} blogPostId - Blog post ID
 * @param {boolean} isCurrentlyLiked - Whether the post is currently liked by user
 * @returns {Promise<{likes: number, isLiked: boolean}>} New like count and liked status
 */
export const toggleLike = async (blogPostId, isCurrentlyLiked) => {
  try {
    // First fetch current likes count
    const post = await directus.request(
      readItem("blog_post", blogPostId, {
        fields: ["likes"],
      })
    );

    const currentLikes = post.likes || 0;
    let newLikes;

    if (isCurrentlyLiked) {
      // Unlike: decrease count
      newLikes = Math.max(0, currentLikes - 1); // Never go below 0
    } else {
      // Like: increase count
      newLikes = currentLikes + 1;
    }

    // Update like count
    await directus.request(
      updateItem("blog_post", blogPostId, {
        likes: newLikes,
      })
    );

    return {
      likes: newLikes,
      isLiked: !isCurrentlyLiked,
    };
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};
