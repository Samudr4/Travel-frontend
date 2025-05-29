import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SAMPLE_BLOG_POSTS } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner'; 

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
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);


const TravelGuidePostPage: React.FC = () => {
  const { postId: postSlug } = useParams<{ postId: string }>(); 
  const post = SAMPLE_BLOG_POSTS.find(p => p.slug === postSlug);

  if (!post) {
    return (
      <div className="text-center py-20 bg-white p-8 rounded-lg shadow-xl min-h-[50vh] flex flex-col justify-center items-center">
        <LoadingSpinner message="Trying to find that guide..." size="lg" />
        <h2 className="text-2xl font-semibold text-text-light mt-6">Oops! Post not found.</h2>
        <p className="text-text-light mb-6">The travel guide you're looking for might have moved or no longer exists.</p>
        <Link 
            to="/travel-guide" 
            className="inline-flex items-center text-primary hover:text-secondary font-semibold transition-colors py-2.5 px-5 rounded-lg border border-primary hover:border-secondary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2"/> Back to Travel Guide
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-neutral-light/50">
      <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-80 lg:h-96 object-cover" />
      <div className="p-6 md:p-10">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-4 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-text-light mb-5 space-x-4 border-b border-neutral-light pb-4">
          <span className="flex items-center">
            <CalendarIcon /> Published on: {new Date(post.date).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}
          </span>
          <span className="flex items-center">
            <UserIcon /> By: <span className="font-semibold ml-1">{post.author}</span>
          </span>
        </div>
        <div className="my-6">
            {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-secondary/10 text-secondary text-xs font-medium px-3 py-1.5 rounded-full mr-2 mb-2 hover:bg-secondary/20 transition-colors">
                    #{tag}
                </span>
            ))}
        </div>
        
        <article 
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-text leading-relaxed prose-headings:font-display prose-headings:text-primary prose-a:text-secondary prose-strong:text-text-dark prose-ul:list-disc prose-ol:list-decimal prose-li:my-1.5 prose-img:rounded-md prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        <div className="mt-10 pt-8 border-t border-neutral-light">
          <Link 
            to="/travel-guide" 
            className="inline-flex items-center text-primary hover:text-secondary font-semibold transition-colors group py-2 px-4 rounded-md hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
             <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"/>
            Back to Travel Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TravelGuidePostPage;