// src/app/blogs/[id]/page.jsx
'use client';

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Calendar, MessageSquare, User, Send, CornerDownRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';
import BlogSidebar from '../BlogSidebar';
import '../blogs.css';

export default function BlogDetailPage({ params }) {
  const unwrappedParams = use(params);
  const blogId = unwrappedParams.id;

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Reply states
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [postingReply, setPostingReply] = useState(false);

  const isSubmittingRef = useRef(false);
  const isPostingReplyRef = useRef(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 40 });
    fetchBlogData();

    const commentsRef = ref(database, 'comments');
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const formattedData = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key],
        }));
        const blogComments = formattedData.filter((c) => c.blogId === blogId);
        setComments(blogComments);
      } else {
        setComments([]);
      }
    });

    return () => unsubscribe();
  }, [blogId]);

  const fetchBlogData = async () => {
    const res = await dbService.getAll('blogs');
    if (res.success && res.data) {
      setAllBlogs(res.data);
      const currentBlog = res.data.find((b) => b.id === blogId);
      if (currentBlog) setBlog(currentBlog);
    }
    setLoading(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current || submitting) return;

    isSubmittingRef.current = true;
    setSubmitting(true);

    const payload = {
      blogId,
      name,
      email,
      message,
      parentId: null,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const res = await dbService.create('comments', payload);
    if (res.success) {
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Failed to post comment.');
    }

    isSubmittingRef.current = false;
    setSubmitting(false);
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyMessage.trim() || isPostingReplyRef.current || postingReply) return;

    isPostingReplyRef.current = true;
    setPostingReply(true);

    const payload = {
      blogId,
      name: 'Admin / Author',
      email: 'hridesh027@gmail.com',
      message: replyMessage.trim(),
      parentId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const res = await dbService.create('comments', payload);
    if (res.success) {
      setReplyingTo(null);
      setReplyMessage('');
    } else {
      alert('Failed to post reply.');
    }

    isPostingReplyRef.current = false;
    setPostingReply(false);
  };

  if (loading) {
    return <div className="text-center py-5 text-secondary fw-bold">Loading Blog Detail...</div>;
  }

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold text-dark mb-3">Blog Not Found</h3>
        <Link href="/blogs" className="btn btn-danger rounded-pill px-4 fw-bold">Back to Blogs</Link>
      </div>
    );
  }

  const blogImage = blog.imageUrl || blog.image || '/images/servicesman.webp';
  const mainComments = comments.filter((c) => !c.parentId);
  const getRepliesForComment = (commentId) => comments.filter((c) => c.parentId === commentId);

  return (
    <>
      <Header />

      <main className="blogs-main">
        {/* HERO BANNER */}
        <section className="blogs-hero text-white position-relative">
          <div className="blogs-hero-bg"></div>
          <div className="blogs-hero-overlay"></div>
          <div className="container position-relative z-2 py-4">
            <div className="row">
              <div className="col-lg-9 text-start">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-dark bg-opacity-50 border border-light border-opacity-25 mb-2">
                  <span style={{ width: '20px', height: '2px', background: '#D6241D', display: 'inline-block' }}></span>
                  <span className="small fw-bold tracking-wider text-danger">{blog.category?.toUpperCase() || 'ARTICLE'}</span>
                </div>
                <h1 className="fs-3 fw-bold mb-2 text-white lh-base">{blog.title}</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 bg-dark bg-opacity-50 px-3 py-1 rounded-pill d-inline-flex align-items-center border border-light border-opacity-10 small">
                    <li className="breadcrumb-item"><Link href="/" className="text-danger text-decoration-none fw-semibold">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/blogs" className="text-danger text-decoration-none fw-semibold">Blogs</Link></li>
                    <li className="breadcrumb-item active text-light fw-semibold" aria-current="page">{blog.category || 'Detail'}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 position-relative overflow-hidden">
          <div className="container position-relative z-2">
            <div className="row g-4">
              
              <div className="col-lg-8 text-start">
                <div className="glass-card p-4 p-md-5 rounded-4 shadow-sm bg-white bg-opacity-75">
                  
                  <div className="d-flex flex-wrap align-items-center gap-3 text-muted small pb-3 mb-4 border-bottom border-light-subtle">
                    <span className="d-flex align-items-center gap-1 text-danger"><User size={15} /> {blog.author || 'Admin'}</span>
                    <span className="d-flex align-items-center gap-1"><MessageSquare size={15} /> {comments.length} Comments</span>
                    <span className="d-flex align-items-center gap-1"><Calendar size={15} /> {blog.date || 'Mar 21'}</span>
                  </div>

                  <div className="mb-4 rounded-4 overflow-hidden shadow-sm" style={{ height: '380px' }}>
                    <img src={blogImage} alt={blog.title} className="w-100 h-100 object-fit-cover" />
                  </div>

                  {/* PROMINENT BLOG TITLE INSIDE CARD */}
                  <h2 className="fs-4 fw-bold text-dark mb-4 lh-base">{blog.title}</h2>

                  <div className="text-secondary small lh-lg mb-5" style={{ fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                    {blog.content}
                  </div>

                  {/* Discussions & Nested Comments Section */}
                  <div className="mb-5 pt-3 border-top border-light-subtle">
                    <h4 className="fs-5 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                      <MessageSquare size={20} className="text-danger" /> Discussions ({comments.length})
                    </h4>

                    {mainComments.length === 0 ? (
                      <p className="text-muted small fst-italic">No comments yet. Be the first to share your thoughts!</p>
                    ) : (
                      <div className="d-grid gap-3">
                        {mainComments.map((comm) => {
                          const replies = getRepliesForComment(comm.id);
                          const collapseId = `replies-${comm.id}`;

                          return (
                            <div key={comm.id} className="p-3 rounded-4 bg-light shadow-sm border border-light-subtle">
                              <div className="d-flex gap-3 align-items-start">
                                <div className="bg-danger text-white rounded-circle fw-bold d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                  {comm.name ? comm.name[0].toUpperCase() : 'U'}
                                </div>
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                    <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '0.9rem' }}>{comm.name}</h6>
                                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{comm.date}</span>
                                  </div>
                                  <p className="text-secondary small mb-2">{comm.message}</p>
                                  
                                  <div className="d-flex align-items-center gap-3">
                                    <button 
                                      className="btn btn-link text-danger p-0 text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1" 
                                      style={{ fontSize: '0.75rem' }} 
                                      onClick={() => { setReplyingTo(replyingTo === comm.id ? null : comm.id); setReplyMessage(''); }}
                                    >
                                      <CornerDownRight size={12} /> {replyingTo === comm.id ? 'Cancel' : 'Reply'}
                                    </button>

                                    {replies.length > 0 && (
                                      <button 
                                        className="btn btn-link text-secondary p-0 text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1" 
                                        style={{ fontSize: '0.75rem' }} 
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${collapseId}`}
                                        aria-expanded="false"
                                        aria-controls={collapseId}
                                      >
                                        <ChevronDown size={14} /> View Replies ({replies.length})
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {replies.length > 0 && (
                                <div className="collapse mt-3" id={collapseId}>
                                  <div className="ps-4 ms-3 border-start border-2 border-danger border-opacity-25 d-grid gap-2">
                                    {replies.map((rep) => {
                                      const subReplies = getRepliesForComment(rep.id);

                                      return (
                                        <div key={rep.id} className="p-2 rounded-3 bg-white shadow-sm border border-light-subtle">
                                          <div className="d-flex gap-2 align-items-start">
                                            <div className="bg-dark text-white rounded-circle fw-bold d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>
                                              {rep.name ? rep.name[0].toUpperCase() : 'A'}
                                            </div>
                                            <div className="flex-grow-1">
                                              <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '0.8rem' }}>{rep.name}</h6>
                                                <span className="text-muted" style={{ fontSize: '0.7rem' }}>{rep.date}</span>
                                              </div>
                                              <p className="text-secondary small mb-1" style={{ fontSize: '0.85rem' }}>{rep.message}</p>

                                              <button 
                                                className="btn btn-link text-danger p-0 text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1" 
                                                style={{ fontSize: '0.7rem' }} 
                                                onClick={() => { setReplyingTo(replyingTo === rep.id ? null : rep.id); setReplyMessage(''); }}
                                              >
                                                <CornerDownRight size={10} /> {replyingTo === rep.id ? 'Cancel' : 'Reply'}
                                              </button>
                                            </div>
                                          </div>

                                          {replyingTo === rep.id && (
                                            <div className="mt-2 ps-4">
                                              <div className="input-group input-group-sm">
                                                <input 
                                                  type="text" 
                                                  className="form-control rounded-start-pill px-3" 
                                                  placeholder="Reply to this response..." 
                                                  value={replyMessage}
                                                  onChange={(e) => setReplyMessage(e.target.value)}
                                                  disabled={postingReply}
                                                />
                                                <button 
                                                  className="btn btn-danger rounded-end-pill px-3 fw-bold" 
                                                  type="button" 
                                                  onClick={() => handleReplySubmit(rep.id)}
                                                  disabled={postingReply || !replyMessage.trim()}
                                                >
                                                  {postingReply ? 'Sending...' : 'Send'}
                                                </button>
                                              </div>
                                            </div>
                                          )}

                                          {subReplies.length > 0 && (
                                            <div className="mt-2 ps-3 ms-2 border-start border-1 border-secondary border-opacity-25 d-grid gap-2">
                                              {subReplies.map((sub) => (
                                                <div key={sub.id} className="p-2 rounded-3 bg-light border border-light-subtle d-flex gap-2 align-items-start">
                                                  <div className="bg-secondary text-white rounded-circle fw-bold d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px', fontSize: '0.7rem' }}>
                                                    {sub.name ? sub.name[0].toUpperCase() : 'U'}
                                                  </div>
                                                  <div className="flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                      <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '0.75rem' }}>{sub.name}</h6>
                                                      <span className="text-muted" style={{ fontSize: '0.65rem' }}>{sub.date}</span>
                                                    </div>
                                                    <p className="text-secondary small mb-0" style={{ fontSize: '0.8rem' }}>{sub.message}</p>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {replyingTo === comm.id && (
                                <div className="mt-3 ps-5">
                                  <div className="input-group input-group-sm">
                                    <input 
                                      type="text" 
                                      className="form-control rounded-start-pill px-3" 
                                      placeholder="Write a reply..." 
                                      value={replyMessage}
                                      onChange={(e) => setReplyMessage(e.target.value)}
                                      disabled={postingReply}
                                    />
                                    <button 
                                      className="btn btn-danger rounded-end-pill px-3 fw-bold" 
                                      type="button" 
                                      onClick={() => handleReplySubmit(comm.id)}
                                      disabled={postingReply || !replyMessage.trim()}
                                    >
                                      {postingReply ? 'Sending...' : 'Send'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Leave a Comment Form */}
                  <div className="mt-4 pt-4 border-top border-light-subtle">
                    <h4 className="fs-5 fw-bold text-dark mb-3">Join the Discussion</h4>
                    <form onSubmit={handleCommentSubmit} className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">FULL NAME</label>
                        <input type="text" className="form-control rounded-pill px-3 py-2 bg-white small" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Oliver Spiteri" required disabled={submitting} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">EMAIL ADDRESS</label>
                        <input type="email" className="form-control rounded-pill px-3 py-2 bg-white small" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" required disabled={submitting} />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">ADD A COMMENT</label>
                        <textarea rows="3" className="form-control rounded-4 p-3 bg-white small" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you think about this article?" required disabled={submitting}></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-danger rounded-pill px-4 fw-bold py-2 shadow-sm d-inline-flex align-items-center gap-2" disabled={submitting}>
                          <Send size={15} /> {submitting ? 'POSTING...' : 'COMMENT'}
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>

              <div className="col-lg-4 text-start">
                <BlogSidebar blogs={allBlogs} />
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}