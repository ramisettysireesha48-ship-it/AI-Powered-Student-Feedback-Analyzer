// ======================================
// AI-POWERED STUDENT FEEDBACK ANALYZER
// ======================================

// Positive words
const positiveWordsList = [
    "good",
    "great",
    "excellent",
    "amazing",
    "helpful",
    "best",
    "better",
    "clear",
    "clearly",
    "easy",
    "interesting",
    "enjoyed",
    "enjoy",
    "love",
    "loved",
    "perfect",
    "awesome",
    "friendly",
    "supportive",
    "satisfied",
    "satisfaction",
    "useful",
    "effective",
    "wonderful",
    "fantastic",
    "understand",
    "understood",
    "improve",
    "improved",
    "practical"
];


// Negative words
const negativeWordsList = [
    "bad",
    "poor",
    "worst",
    "difficult",
    "hard",
    "confusing",
    "confused",
    "boring",
    "boring",
    "slow",
    "late",
    "problem",
    "problems",
    "issue",
    "issues",
    "disappointed",
    "disappointing",
    "unhappy",
    "hate",
    "hated",
    "weak",
    "unclear",
    "noise",
    "noisy",
    "stress",
    "stressful",
    "lack",
    "lacking",
    "improve",
    "improvement"
];


// Stop words
const stopWords = [
    "the",
    "and",
    "this",
    "that",
    "with",
    "from",
    "have",
    "has",
    "was",
    "were",
    "are",
    "is",
    "very",
    "for",
    "but",
    "not",
    "you",
    "your",
    "our",
    "they",
    "their",
    "about",
    "into",
    "also",
    "can",
    "could",
    "would",
    "should",
    "will",
    "been",
    "being",
    "a",
    "an",
    "of",
    "to",
    "in",
    "on",
    "at",
    "it",
    "we",
    "i",
    "my",
    "me",
    "students",
    "student"
];


// ======================================
// LOAD EXAMPLES
// ======================================

function loadExample(type) {

    const feedback = document.getElementById("feedback");

    if (type === "positive") {

        feedback.value =
            "The teaching was excellent and the faculty explained difficult topics clearly. I enjoyed the practical sessions and the learning environment was very supportive and helpful.";

    }

    else if (type === "negative") {

        feedback.value =
            "The classes were confusing and difficult to understand. The teaching was slow and some practical sessions were boring. The classroom also had noise problems.";

    }

    else {

        feedback.value =
            "The teaching was satisfactory. The faculty covered the syllabus and conducted regular classes. The practical sessions were completed as planned.";

    }
}


// ======================================
// ANALYZE FEEDBACK
// ======================================

function analyzeFeedback() {

    const studentName =
        document.getElementById("studentName").value.trim();

    const feedback =
        document.getElementById("feedback").value.trim();


    if (feedback === "") {

        alert("Please enter student feedback before analyzing.");

        return;
    }


    // Convert feedback to lowercase
    const lowerText = feedback.toLowerCase();


    // Extract words
    const words = lowerText
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 0);


    // Count positive words
    const positiveMatches = [];

    words.forEach(word => {

        if (positiveWordsList.includes(word)) {

            positiveMatches.push(word);

        }

    });


    // Count negative words
    const negativeMatches = [];

    words.forEach(word => {

        if (negativeWordsList.includes(word)) {

            negativeMatches.push(word);

        }

    });


    // Calculate sentiment
    const positiveCount = positiveMatches.length;
    const negativeCount = negativeMatches.length;


    let sentiment;
    let emotion;
    let score;
    let summary;


    if (positiveCount > negativeCount) {

        sentiment = "Positive";
        score = Math.min(
            98,
            70 + ((positiveCount - negativeCount) * 7)
        );

        emotion = getPositiveEmotion(lowerText);

        summary =
            "The feedback indicates a positive student experience with several encouraging comments.";

    }

    else if (negativeCount > positiveCount) {

        sentiment = "Negative";

        score = Math.max(
            25,
            60 - ((negativeCount - positiveCount) * 8)
        );

        emotion = getNegativeEmotion(lowerText);

        summary =
            "The feedback highlights areas that may require attention and improvement.";

    }

    else {

        sentiment = "Neutral";
        score = 50;
        emotion = "Neutral";

        summary =
            "The feedback appears balanced and does not strongly indicate positive or negative sentiment.";

    }


    // ======================================
    // KEYWORD EXTRACTION
    // ======================================

    const frequency = {};

    words.forEach(word => {

        if (
            word.length > 3 &&
            !stopWords.includes(word) &&
            !positiveWordsList.includes(word) &&
            !negativeWordsList.includes(word)
        ) {

            frequency[word] =
                (frequency[word] || 0) + 1;

        }

    });


    const keywords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(item => item[0]);


    // ======================================
    // UPDATE UI
    // ======================================

    document.getElementById("score").textContent =
        score + "%";

    document.getElementById("sentiment").textContent =
        sentiment;

    document.getElementById("sentimentValue").textContent =
        sentiment;

    document.getElementById("emotionValue").textContent =
        emotion;

    document.getElementById("wordCount").textContent =
        words.length;

    document.getElementById("keywordCount").textContent =
        keywords.length;

    document.getElementById("summary").textContent =
        summary;

    document.getElementById("status").textContent =
        "Analyzed";


    document.getElementById("positiveWords").textContent =
        positiveMatches.length > 0
            ? [...new Set(positiveMatches)].join(", ")
            : "None found";


    document.getElementById("negativeWords").textContent =
        negativeMatches.length > 0
            ? [...new Set(negativeMatches)].join(", ")
            : "None found";


    // ======================================
    // DISPLAY KEYWORDS
    // ======================================

    const keywordContainer =
        document.getElementById("keywords");

    keywordContainer.innerHTML = "";


    if (keywords.length === 0) {

        keywordContainer.innerHTML =
            '<span class="empty">No important keywords found</span>';

    }

    else {

        keywords.forEach(keyword => {

            const span =
                document.createElement("span");

            span.className = "keyword";

            span.textContent = keyword;

            keywordContainer.appendChild(span);

        });

    }


    // ======================================
    // SCORE CIRCLE
    // ======================================

    const scoreCircle =
        document.getElementById("scoreCircle");


    if (sentiment === "Positive") {

        scoreCircle.style.background = "#e9f9ef";
        scoreCircle.style.borderColor = "#bcebc9";

    }

    else if (sentiment === "Negative") {

        scoreCircle.style.background = "#fff0f0";
        scoreCircle.style.borderColor = "#ffcaca";

    }

    else {

        scoreCircle.style.background = "#fff9e7";
        scoreCircle.style.borderColor = "#f4df9b";

    }


    // Student name
    if (studentName !== "") {

        document.getElementById("summary").textContent =
            studentName +
            ", " +
            summary.charAt(0).toLowerCase() +
            summary.slice(1);

    }

}


// ======================================
// POSITIVE EMOTION
// ======================================

function getPositiveEmotion(text) {

    if (
        text.includes("excellent") ||
        text.includes("amazing") ||
        text.includes("fantastic") ||
        text.includes("awesome")
    ) {

        return "Excited";

    }

    if (
        text.includes("happy") ||
        text.includes("enjoyed") ||
        text.includes("love")
    ) {

        return "Happy";

    }

    if (
        text.includes("helpful") ||
        text.includes("supportive") ||
        text.includes("clear")
    ) {

        return "Satisfied";

    }

    return "Positive";
}


// ======================================
// NEGATIVE EMOTION
// ======================================

function getNegativeEmotion(text) {

    if (
        text.includes("confusing") ||
        text.includes("unclear") ||
        text.includes("difficult")
    ) {

        return "Confused";

    }

    if (
        text.includes("disappointed") ||
        text.includes("unhappy")
    ) {

        return "Disappointed";

    }

    if (
        text.includes("stress") ||
        text.includes("stressful")
    ) {

        return "Stressed";

    }

    return "Concerned";
}


// ======================================
// CLEAR
// ======================================

function clearAnalysis() {

    document.getElementById("studentName").value = "";

    document.getElementById("feedback").value = "";

    document.getElementById("score").textContent = "--";

    document.getElementById("sentiment").textContent =
        "No Analysis";

    document.getElementById("sentimentValue").textContent =
        "--";

    document.getElementById("emotionValue").textContent =
        "--";

    document.getElementById("keywordCount").textContent =
        "--";

    document.getElementById("wordCount").textContent =
        "--";

    document.getElementById("summary").textContent =
        "Enter feedback and click Analyze Feedback.";

    document.getElementById("positiveWords").textContent =
        "--";

    document.getElementById("negativeWords").textContent =
        "--";

    document.getElementById("status").textContent =
        "Waiting";

    document.getElementById("keywords").innerHTML =
        '<span class="empty">No keywords yet</span>';

    const scoreCircle =
        document.getElementById("scoreCircle");

    scoreCircle.style.background = "#eeeaff";
    scoreCircle.style.borderColor = "#ded7ff";
}