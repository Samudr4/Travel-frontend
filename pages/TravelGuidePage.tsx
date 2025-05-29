import React from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-text-light" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-text-light" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);


const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link to={`/travel-guide/${post.slug}`} className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col border border-transparent hover:border-primary/20">
      <div className="overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-text-light mb-2 space-x-3">
            <span className="flex items-center"><CalendarIcon /> {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span className="flex items-center"><UserIcon /> By {post.author}</span>
        </div>
        <h3 className="text-xl font-display font-semibold text-primary mb-2.5 group-hover:text-secondary transition-colors duration-200 line-clamp-2" title={post.title}>{post.title}</h3>
        <p className="text-sm text-text-light mb-4 leading-relaxed flex-grow line-clamp-3">{post.summary}</p>
        <div className="mt-auto">
            {post.tags.slice(0,3).map(tag => (
                <span key={tag} className="inline-block bg-secondary/10 text-secondary text-xs font-medium px-2.5 py-1 rounded-full mr-2 mb-2 group-hover:bg-secondary/20 transition-colors">
                    #{tag}
                </span>
            ))}
        </div>
         <span className="mt-3 text-sm text-accent font-semibold group-hover:underline inline-flex items-center">Read More <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200">&rarr;</span></span>
      </div>
    </Link>
  );
};

const TravelGuidePage: React.FC = () => {
  const sortedPosts = [...SAMPLE_BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">North East India Travel Guide</h1>
        <p className="text-lg text-text-light max-w-2xl mx-auto leading-relaxed">
          Discover insights, tips, and stories to inspire your journey through the enchanting landscapes and vibrant cultures of Northeast India.
        </p>
      </header>
      
      {sortedPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {sortedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white p-8 rounded-xl shadow-xl border border-neutral-light/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-24 h-24 text-neutral-dark mx-auto mb-6 opacity-25">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <h2 className="text-2xl font-semibold text-text-dark mb-3">No Travel Guides Yet</h2>
            <p className="text-text-light mb-6">Our team is busy curating amazing content. Please check back soon for inspiring stories and tips!</p>
        </div>
      )}
    </div>
  );
};

export default TravelGuidePage;