'use client'

import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Menu,
    BookOpen,
    CheckCircle,
    Circle,
    Star,
    Clock,
    Users,
    Award,
    Download,
    Share,
    Bookmark
} from 'lucide-react';

export default function CoursePage() {
    const [activeSection, setActiveSection] = useState(0);
    const [completedSections, setCompletedSections] = useState(new Set());
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Mock course data
    const courseData = {
        title: "Digital Marketing Strategy",
        description: "Build effective marketing campaigns across social media, email, and content marketing.",
        rating: 4.90,
        students: 12500,
        lessons: 8,
        duration: "20 hours",
        instructor: "Sarah Johnson",
        level: "Intermediate"
    };

    const courseSections = [
        {
            id: 0,
            title: "Introduction to Digital Marketing",
            duration: "15 min",
            content: `
        <h2>What is Digital Marketing?</h2>
        <p>Digital marketing encompasses all marketing efforts that use an electronic device or the internet. Businesses leverage digital channels such as search engines, social media, email, and other websites to connect with current and prospective customers.</p>
        
        <h3>Key Components of Digital Marketing</h3>
        <ul>
          <li><strong>Search Engine Optimization (SEO)</strong> - Optimizing your website to rank higher in search engine results</li>
          <li><strong>Pay-Per-Click (PPC)</strong> - Paid advertising where you pay each time someone clicks your ad</li>
          <li><strong>Social Media Marketing</strong> - Using social platforms to promote your brand</li>
          <li><strong>Content Marketing</strong> - Creating valuable content to attract customers</li>
          <li><strong>Email Marketing</strong> - Sending targeted emails to prospects and customers</li>
        </ul>

        <div class="example-box">
          <h4>💡 Example</h4>
          <p>A local restaurant might use digital marketing by:</p>
          <ul>
            <li>Creating Instagram posts showcasing their dishes</li>
            <li>Running Google Ads for "best pizza near me"</li>
            <li>Sending email newsletters with special offers</li>
            <li>Optimizing their website for local search</li>
          </ul>
        </div>

        <h3>Why Digital Marketing Matters</h3>
        <p>In today's digital age, consumers spend significant time online. Digital marketing allows businesses to:</p>
        <ol>
          <li>Reach customers where they spend their time</li>
          <li>Target specific demographics and interests</li>
          <li>Measure results accurately</li>
          <li>Adjust strategies in real-time</li>
          <li>Compete with larger businesses on a level playing field</li>
        </ol>
      `
        },
        {
            id: 1,
            title: "Understanding Your Target Audience",
            duration: "25 min",
            content: `
        <h2>Defining Your Target Audience</h2>
        <p>Before launching any marketing campaign, you must understand who you're trying to reach. A well-defined target audience helps you create more effective and efficient marketing campaigns.</p>

        <h3>Creating Buyer Personas</h3>
        <p>A buyer persona is a semi-fictional representation of your ideal customer based on market research and real data about your existing customers.</p>

        <div class="code-example">
          <h4>📋 Buyer Persona Template</h4>
          <pre>
<strong>Persona Name:</strong> Marketing Mary
<strong>Age:</strong> 32
<strong>Job Title:</strong> Marketing Manager
<strong>Goals:</strong> Increase brand awareness, generate leads
<strong>Challenges:</strong> Limited budget, measuring ROI
<strong>Preferred Channels:</strong> LinkedIn, Email, Industry blogs
<strong>Buying Behavior:</strong> Researches thoroughly before purchasing
          </pre>
        </div>

        <h3>Audience Research Methods</h3>
        <ul>
          <li><strong>Surveys and Interviews</strong> - Direct feedback from existing customers</li>
          <li><strong>Analytics Data</strong> - Website and social media insights</li>
          <li><strong>Competitor Analysis</strong> - Study who your competitors target</li>
          <li><strong>Social Listening</strong> - Monitor social media conversations</li>
        </ul>

        <div class="tip-box">
          <h4>💡 Pro Tip</h4>
          <p>Use tools like Google Analytics, Facebook Audience Insights, and surveys to gather data about your audience's demographics, interests, and online behavior.</p>
        </div>
      `
        },
        {
            id: 2,
            title: "Content Marketing Fundamentals",
            duration: "30 min",
            content: `
        <h2>The Power of Content Marketing</h2>
        <p>Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience.</p>

        <h3>Types of Content</h3>
        <div class="content-types">
          <div class="type-card">
            <h4>📝 Blog Posts</h4>
            <p>Educational articles, how-to guides, industry insights</p>
          </div>
          <div class="type-card">
            <h4>📹 Videos</h4>
            <p>Tutorials, product demos, behind-the-scenes content</p>
          </div>
          <div class="type-card">
            <h4>📊 Infographics</h4>
            <p>Visual representations of data and processes</p>
          </div>
          <div class="type-card">
            <h4>🎧 Podcasts</h4>
            <p>Audio content for on-the-go consumption</p>
          </div>
        </div>

        <h3>Content Strategy Framework</h3>
        <ol>
          <li><strong>Define Objectives</strong> - What do you want to achieve?</li>
          <li><strong>Know Your Audience</strong> - Who are you creating content for?</li>
          <li><strong>Content Audit</strong> - What content do you already have?</li>
          <li><strong>Content Planning</strong> - What will you create and when?</li>
          <li><strong>Distribution</strong> - Where will you share your content?</li>
          <li><strong>Measurement</strong> - How will you track success?</li>
        </ol>

        <div class="example-box">
          <h4>📈 Content Calendar Example</h4>
          <table>
            <tr>
              <th>Week</th>
              <th>Blog Post</th>
              <th>Social Media</th>
              <th>Email</th>
            </tr>
            <tr>
              <td>Week 1</td>
              <td>SEO Basics Guide</td>
              <td>Quote graphics</td>
              <td>Weekly newsletter</td>
            </tr>
            <tr>
              <td>Week 2</td>
              <td>Case Study</td>
              <td>Behind-the-scenes</td>
              <td>Product update</td>
            </tr>
          </table>
        </div>
      `
        },
        {
            id: 3,
            title: "Social Media Marketing",
            duration: "35 min",
            content: `
        <h2>Mastering Social Media Marketing</h2>
        <p>Social media marketing involves creating and sharing content on social media networks to achieve marketing and branding goals.</p>

        <h3>Platform-Specific Strategies</h3>
        
        <div class="platform-grid">
          <div class="platform-card facebook">
            <h4>📘 Facebook</h4>
            <ul>
              <li>Ideal for: Community building, customer service</li>
              <li>Best content: Videos, live streams, events</li>
              <li>Audience: Broad demographics, 25-54 age range</li>
            </ul>
          </div>

          <div class="platform-card instagram">
            <h4>📸 Instagram</h4>
            <ul>
              <li>Ideal for: Visual storytelling, brand awareness</li>
              <li>Best content: High-quality photos, Stories, Reels</li>
              <li>Audience: Younger demographics, visual-focused</li>
            </ul>
          </div>

          <div class="platform-card linkedin">
            <h4>💼 LinkedIn</h4>
            <ul>
              <li>Ideal for: B2B marketing, thought leadership</li>
              <li>Best content: Professional articles, industry news</li>
              <li>Audience: Professionals, decision makers</li>
            </ul>
          </div>

          <div class="platform-card twitter">
            <h4>🐦 Twitter</h4>
            <ul>
              <li>Ideal for: Real-time updates, customer service</li>
              <li>Best content: News, quick tips, conversations</li>
              <li>Audience: News-conscious, trend followers</li>
            </ul>
          </div>
        </div>

        <h3>Social Media Best Practices</h3>
        <ul>
          <li><strong>Consistency is Key</strong> - Maintain regular posting schedule</li>
          <li><strong>Engage Authentically</strong> - Respond to comments and messages</li>
          <li><strong>Use Hashtags Strategically</strong> - Research relevant hashtags</li>
          <li><strong>Share User-Generated Content</strong> - Showcase customer content</li>
          <li><strong>Monitor Analytics</strong> - Track performance and adjust strategy</li>
        </ul>

        <div class="tip-box">
          <h4>⚡ Quick Tip</h4>
          <p>Use the 80/20 rule: 80% of your content should inform, educate, or entertain your audience, while only 20% should directly promote your business.</p>
        </div>
      `
        }
    ];

    const toggleSectionComplete = (sectionId) => {
        const newCompleted = new Set(completedSections);
        if (newCompleted.has(sectionId)) {
            newCompleted.delete(sectionId);
        } else {
            newCompleted.add(sectionId);
        }
        setCompletedSections(newCompleted);
    };

    const goToNextSection = () => {
        if (activeSection < courseSections.length - 1) {
            setActiveSection(activeSection + 1);
        }
    };

    const goToPrevSection = () => {
        if (activeSection > 0) {
            setActiveSection(activeSection - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex-shrink-0`}>
                <div className="p-4 border-b border-gray-200">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg mb-4"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {sidebarOpen && (
                        <>
                            <h1 className="font-bold text-lg text-gray-900 mb-2">{courseData.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span>{courseData.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{courseData.students.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{courseData.duration}</span>
                                </div>
                            </div>

                            {/* Course Actions */}
                            <div className="flex gap-2 mb-4">
                                <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                                    <Bookmark className="w-4 h-4" />
                                    Save
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                                    <Share className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Course Sections */}
                <div className="p-4">
                    {sidebarOpen && <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>}

                    <div className="space-y-2">
                        {courseSections.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(index)}
                                className={`w-full text-left p-3 rounded-lg transition-colors ${activeSection === index
                                        ? 'bg-blue-50 border-l-4 border-blue-600'
                                        : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSectionComplete(section.id);
                                        }}
                                        className="flex-shrink-0"
                                    >
                                        {completedSections.has(section.id) ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>

                                    {sidebarOpen && (
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-gray-900">{section.title}</div>
                                            <div className="text-xs text-gray-500 mt-1">{section.duration}</div>
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {sidebarOpen && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-green-800">Progress</span>
                            </div>
                            <div className="text-sm text-green-700 mb-2">
                                {completedSections.size} of {courseSections.length} sections completed
                            </div>
                            <div className="w-full bg-green-200 rounded-full h-2">
                                <div
                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(completedSections.size / courseSections.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Content Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {courseSections[activeSection].title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Section {activeSection + 1} of {courseSections.length}</span>
                                <span>{courseSections[activeSection].duration}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPrevSection}
                                disabled={activeSection === 0}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>
                            <button
                                onClick={goToNextSection}
                                disabled={activeSection === courseSections.length - 1}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 px-8 py-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: courseSections[activeSection].content }}
                        />
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bg-white border-t border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => toggleSectionComplete(courseSections[activeSection].id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${completedSections.has(courseSections[activeSection].id)
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            {completedSections.has(courseSections[activeSection].id) ? (
                                <CheckCircle className="w-4 h-4" />
                            ) : (
                                <Circle className="w-4 h-4" />
                            )}
                            {completedSections.has(courseSections[activeSection].id) ? 'Completed' : 'Mark as Complete'}
                        </button>

                        <div className="flex items-center gap-2">
                            {activeSection > 0 && (
                                <button
                                    onClick={goToPrevSection}
                                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous Section
                                </button>
                            )}

                            {activeSection < courseSections.length - 1 ? (
                                <button
                                    onClick={goToNextSection}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                >
                                    Next Section
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                    <Award className="w-4 h-4" />
                                    Complete Course
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .prose p {
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .prose ul, .prose ol {
          color: #4b5563;
          margin-bottom: 1rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .example-box {
          background: #f0f9ff;
          border: 1px solid #0ea5e9;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }
        .tip-box {
          background: #f0fdf4;
          border: 1px solid #22c55e;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }
        .code-example {
          background: #1f2937;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }
        .code-example pre {
          color: #f9fafb;
          margin: 0;
          font-family: 'Courier New', monospace;
          line-height: 1.5;
        }
        .content-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .type-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
        }
        .platform-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .platform-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid #3b82f6;
        }
        .facebook { border-left-color: #1877f2; }
        .instagram { border-left-color: #e4405f; }
        .linkedin { border-left-color: #0077b5; }
        .twitter { border-left-color: #1da1f2; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        th, td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }
        th {
          background: #f9fafb;
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}