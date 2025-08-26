// SEO Technical Audit Quiz JavaScript

const questions = [
    {
        question: "What is the most critical issue that should be addressed first in this SEO audit?",
        answers: [
            "HTTPS not enabled",
            "Missing meta descriptions", 
            "Slow page loading speed",
            "Duplicate content issues"
        ],
        correct: 0,
        explanation: "HTTPS is a critical security and ranking factor. Google has confirmed HTTPS as a ranking signal, and browsers warn users about non-secure sites."
    },
    {
        question: "Based on the audit categories shown, which area has the most issues to resolve?",
        answers: [
            "Content optimization",
            "Speed & Performance", 
            "Crawling & Indexing",
            "Meta Tags"
        ],
        correct: 2,
        explanation: "Crawling & Indexing issues prevent search engines from properly discovering and indexing your content, making this a high-priority area."
    },
    {
        question: "What does a 'Crawling & Indexing' error typically indicate?",
        answers: [
            "Your content is too short",
            "Search engines can't access or understand your pages",
            "Your images are too large", 
            "Your meta descriptions are missing"
        ],
        correct: 1,
        explanation: "Crawling & Indexing errors mean search engines are having trouble accessing, reading, or including your pages in their index."
    },
    {
        question: "In the 'Speed & Performance' section, what is likely the primary concern?",
        answers: [
            "Server response times and page loading speeds",
            "Content length and readability",
            "Social media integration",
            "Mobile responsiveness only"
        ],
        correct: 0,
        explanation: "Speed & Performance issues primarily relate to how quickly your pages load, which affects both user experience and search rankings."
    },
    {
        question: "What should be the first step when addressing the 'Security' issues shown?",
        answers: [
            "Update website content",
            "Implement SSL certificate and enable HTTPS",
            "Optimize images",
            "Fix internal links"
        ],
        correct: 1,
        explanation: "Security issues in SEO audits typically start with HTTPS implementation, which is both a security measure and a Google ranking factor."
    },
    {
        question: "What is the main purpose of 'Meta Tags' in SEO?",
        answers: [
            "To make the website load faster",
            "To provide information about page content to search engines and users",
            "To fix broken links",
            "To compress images automatically"
        ],
        correct: 1,
        explanation: "Meta tags like title tags and meta descriptions help search engines understand page content and influence how pages appear in search results."
    },
    {
        question: "Which 'Links' issue would have the most negative impact on SEO?",
        answers: [
            "Too few internal links",
            "No external links to authority sites",
            "Broken internal and external links (404 errors)",
            "Links that open in new windows"
        ],
        correct: 2,
        explanation: "Broken links create poor user experience and waste crawl budget, preventing search engines from efficiently indexing your site."
    },
    {
        question: "What does 'Sitemap' issues in an SEO audit typically refer to?",
        answers: [
            "Missing or incorrectly formatted XML sitemaps",
            "Poor website navigation menu",
            "Slow loading homepage",
            "Missing contact page"
        ],
        correct: 0,
        explanation: "XML sitemap issues prevent search engines from efficiently discovering and indexing all your important pages."
    },
    {
        question: "In the 'Content' section, what would be considered a high-priority issue?",
        answers: [
            "Content is too entertaining",
            "Duplicate content across multiple pages",
            "Content uses too many images",
            "Content is updated too frequently"
        ],
        correct: 1,
        explanation: "Duplicate content can cause search engines to struggle with which version to index and rank, diluting your SEO efforts."
    },
    {
        question: "When you see 'CSS' issues in an audit, the main concern is typically:",
        answers: [
            "The website colors don't match the brand",
            "CSS files are blocking page rendering or too large",
            "There aren't enough CSS animations",
            "The CSS is too simple"
        ],
        correct: 1,
        explanation: "CSS issues in SEO audits usually relate to render-blocking resources or oversized files that slow down page loading."
    },
    {
        question: "Based on this audit structure, what would be the most logical order to fix issues?",
        answers: [
            "Content first, then technical issues",
            "Security and crawling issues first, then performance and content",
            "All issues simultaneously",
            "Meta tags first, then everything else"
        ],
        correct: 1,
        explanation: "Technical foundation issues (security, crawling) should be fixed first as they affect whether search engines can access and trust your site."
    },
    {
        question: "What does the presence of multiple categories with issues suggest about this website?",
        answers: [
            "The site is beyond repair",
            "The site needs comprehensive SEO optimization across multiple areas", 
            "Only content updates are needed",
            "The audit tool is malfunctioning"
        ],
        correct: 1,
        explanation: "Multiple categories with issues indicate the website needs a holistic SEO approach, addressing technical, content, and performance aspects."
    },
    {
        question: "Which metric would be most important to track after implementing fixes from this audit?",
        answers: [
            "Social media followers only",
            "Organic search traffic and search rankings",
            "Number of website visitors from paid ads",
            "Email newsletter subscribers"
        ],
        correct: 1,
        explanation: "Organic search performance is the primary indicator of SEO success and should improve as technical issues are resolved."
    },
    {
        question: "What's the relationship between 'Speed & Performance' and SEO rankings?",
        answers: [
            "Page speed has no impact on SEO",
            "Faster pages provide better user experience and are favored by search engines",
            "Only mobile page speed matters for SEO",
            "Page speed only affects paid advertising performance"
        ],
        correct: 1,
        explanation: "Page speed is a confirmed Google ranking factor and directly impacts user experience, bounce rates, and conversion rates."
    }
];

// Quiz state variables
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let hasAnswered = false;

/**
 * Initialize the quiz when page loads
 */
function initQuiz() {
    displayQuestion();
    updateCounter();
    updateProgressBar();
}

/**
 * Display the current question and answers
 */
function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.textContent = answer;
        answerDiv.onclick = () => selectAnswer(index);
        answerDiv.setAttribute('tabindex', '0');
        answerDiv.setAttribute('role', 'button');
        answerDiv.setAttribute('aria-label', `Answer option ${index + 1}: ${answer}`);
        
        // Add keyboard support
        answerDiv.onkeypress = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectAnswer(index);
            }
        };
        
        answersContainer.appendChild(answerDiv);
    });
    
    // Hide explanation and reset button state
    const explanation = document.getElementById('explanation');
    explanation.classList.remove('show');
    document.getElementById('next-btn').disabled = true;
    hasAnswered = false;
    selectedAnswer = null;
}

/**
 * Handle answer selection
 * @param {number} index - Index of selected answer
 */
function selectAnswer(index) {
    if (hasAnswered) return;
    
    selectedAnswer = index;
    const answers = document.querySelectorAll('.answer');
    const question = questions[currentQuestion];
    
    // Update answer styling based on correctness
    answers.forEach((answer, i) => {
        answer.classList.remove('selected');
        answer.onclick = null; // Disable further clicks
        
        if (i === question.correct) {
            answer.classList.add('correct');
        } else if (i === index && i !== question.correct) {
            answer.classList.add('incorrect');
        }
    });
    
    // Update score if correct
    if (index === question.correct) {
        score++;
    }
    
    // Show explanation
    showExplanation(question.explanation);
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
    document.getElementById('next-btn').focus();
    hasAnswered = true;
}

/**
 * Show explanation for the current question
 * @param {string} explanationText - Explanation text to display
 */
function showExplanation(explanationText) {
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = `<h4>Explanation:</h4><p>${explanationText}</p>`;
    explanationDiv.classList.add('show');
}

/**
 * Move to next question or show results
 */
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        displayQuestion();
        updateCounter();
        updateProgressBar();
    } else {
        showResults();
    }
}

/**
 * Update question counter display
 */
function updateCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

/**
 * Update progress bar based on current question
 */
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = `${progress}%`;
}

/**
 * Display final results
 */
function showResults() {
    // Hide quiz content and show results
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('results').classList.add('show');
    
    // Calculate and display score
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('final-score').textContent = `${score}/${questions.length}`;
    
    // Generate performance message
    let message = getPerformanceMessage(percentage);
    document.getElementById('score-text').textContent = `${percentage}% - ${message}`;
    
    // Focus on restart button for accessibility
    setTimeout(() => {
        document.querySelector('#results .btn').focus();
    }, 100);
}

/**
 * Get performance message based on score percentage
 * @param {number} percentage - Score percentage
 * @returns {string} Performance message
 */
function getPerformanceMessage(percentage) {
    if (percentage >= 90) {
        return 'Excellent! You have a strong understanding of SEO technical audits.';
    } else if (percentage >= 70) {
        return 'Good job! You understand most SEO audit concepts.';
    } else if (percentage >= 50) {
        return 'Not bad! Consider reviewing SEO technical best practices.';
    } else {
        return 'Keep learning! SEO audits require understanding multiple technical areas.';
    }
}

/**
 * Restart the quiz
 */
function restartQuiz() {
    // Reset all variables
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    hasAnswered = false;
    
    // Show quiz content and hide results
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('results').classList.remove('show');
    
    // Reinitialize quiz
    initQuiz();
}

/**
 * Add keyboard navigation support
 */
function addKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        // Allow Enter key to trigger next button if enabled
        if (e.key === 'Enter' && !document.getElementById('next-btn').disabled) {
            nextQuestion();
        }
        
        // Allow R key to restart quiz when on results screen
        if (e.key === 'r' || e.key === 'R') {
            if (document.getElementById('results').classList.contains('show')) {
                restartQuiz();
            }
        }
    });
}

/**
 * Track quiz analytics (if needed for future enhancement)
 */
function trackQuizCompletion(score, totalQuestions) {
    // Placeholder for analytics tracking
    console.log(`Quiz completed: ${score}/${totalQuestions} (${Math.round((score/totalQuestions)*100)}%)`);
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    addKeyboardSupport();
});

// Add error handling for better user experience
window.addEventListener('error', function(e) {
    console.error('Quiz error:', e.error);
    // Could add user-friendly error message here
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        questions,
        initQuiz,
        selectAnswer,
        nextQuestion,
        restartQuiz,
        getPerformanceMessage
    };
}