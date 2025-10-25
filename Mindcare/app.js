document.addEventListener('DOMContentLoaded', () => {
    // --- Data Mockup ---
    const MOCK_JOURNAL_ENTRIES = [
        {
            id: 1,
            date: 'Oct 23, 2025',
            mood: 'happy',
            title: 'Productive Morning Flow',
            excerpt: "Had a great morning! Finished my main task for the day before lunch and felt a real sense of accomplishment. The deep breathing exercise helped me focus on the next steps.",
            tags: ['productive', 'calm']
        },
        {
            id: 2,
            date: 'Oct 22, 2025',
            mood: 'calm',
            title: 'Evening Reflection',
            excerpt: "Took a walk after work. The quiet time was really peaceful. Just a simple day, nothing major, but feeling grounded and ready for a good night's sleep.",
            tags: ['calm']
        },
        {
            id: 3,
            date: 'Oct 21, 2025',
            mood: 'neutral',
            title: 'Busy Day Logistics',
            excerpt: "The day was a blur of meetings and emails. Didn't have much time to reflect, but managed to keep my cool and stick to the schedule. Neutral day overall.",
            tags: ['productive']
        }
    ];

    const MOCK_RESOURCES = [
        {
            title: '5-Minute Guided Meditation',
            type: 'Audio',
            color: 'bg-green-100 text-green-700'
        },
        {
            title: 'Cognitive Reframing Guide',
            type: 'PDF',
            color: 'bg-indigo-100 text-indigo-700'
        },
        {
            title: 'Journaling Prompts for Anxiety',
            type: 'Exercise',
            color: 'bg-red-100 text-red-700'
        }
    ];

    // --- Utility Functions ---

    /**
     * Renders a single journal entry card.
     * @param {object} entry - The journal entry data.
     */
    const renderJournalEntry = (entry) => {
        const tagMap = {
            'calm': 'calm-tag',
            'productive': 'productive-tag'
        };

        const moodIconMap = {
            'sad': '😔',
            'neutral': '😐',
            'calm': '🙂',
            'happy': '😊',
            'excited': '😃'
        };

        const tagHTML = entry.tags.map(tag => <span class="${tagMap[tag]}">${tag}</span>).join('');

        return `
            <div class="p-4 border border-gray-100 rounded-lg mb-3 hover:bg-gray-50 card-animate">
                <div class="flex justify-between items-start">
                    <h4 class="text-md font-semibold text-gray-800">${moodIconMap[entry.mood]} ${entry.title}</h4>
                    <span class="text-xs text-gray-400">${entry.date}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2">${entry.excerpt}</p>
                <div class="flex space-x-2 mt-2">
                    ${tagHTML}
                </div>
            </div>
        `;
    };

    /**
     * Renders a single resource link.
     * @param {object} resource - The resource data.
     */
    const renderResource = (resource) => {
        return `
            <a href="#" class="block p-3 ${resource.color} rounded-lg text-sm font-medium hover:opacity-90 card-animate">
                <div class="flex justify-between items-center">
                    <span>${resource.title}</span>
                    <span class="text-xs opacity-80">${resource.type}</span>
                </div>
            </a>
        `;
    };

    /**
     * Renders all journal entries and resources.
     */
    const initializeContent = () => {
        const journalContainer = document.getElementById('journal-entries-container');
        const resourcesContainer = document.getElementById('resources-container');
        const resourcesContainerExpanded = document.getElementById('resources-container-expanded');

        if (journalContainer) {
            journalContainer.innerHTML = MOCK_JOURNAL_ENTRIES.map(renderJournalEntry).join('');
        }
        if (resourcesContainer) {
            resourcesContainer.innerHTML = MOCK_RESOURCES.map(renderResource).join('');
        }
        if (resourcesContainerExpanded) {
             // Render the same resources in the expanded view
            resourcesContainerExpanded.innerHTML = MOCK_RESOURCES.map(renderResource).join('');
        }
    };


    // --- Navigation and Content Switching Logic ---

    const navLinks = document.querySelectorAll('.main-nav-link');
    const contentSections = document.querySelectorAll('.main-content-section');
    const initialActiveSection = 'journal'; // Set journal as the initial active view

    /**
     * Handles the switching between different main content sections.
     * @param {string} targetId - The ID of the content section to display (e.g., 'dashboard').
     */
    const switchContent = (targetId) => {
        // 1. Hide all content sections
        contentSections.forEach(section => {
            section.classList.add('hidden');
        });

        // 2. Show the target section
        const targetSection = document.getElementById(${targetId}-content);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // 3. Update active navigation link styling
        navLinks.forEach(link => {
            if (link.dataset.target === targetId) {
                // Active style: text-white, slight change for visual pop
                link.classList.remove('text-purple-200');
                link.classList.add('text-white', 'font-semibold'); 
            } else {
                // Inactive style: text-purple-200
                link.classList.remove('text-white', 'font-semibold');
                link.classList.add('text-purple-200');
            }
        });
    };

    // Attach click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            switchContent(target);
        });
    });

    // Initialize the view
    switchContent(initialActiveSection);
    
    // --- Mood Picker Logic ---

    const moodIcons = document.querySelectorAll('.mood-icon');

    moodIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // 1. Remove active styles from all icons
            moodIcons.forEach(i => {
                i.classList.remove('ring-2', 'ring-blue-500', 'rounded-full', 'p-1', '-m-1', 'mood-icon-active');
                i.classList.add('opacity-50');
            });

            // 2. Add active styles to the clicked icon
            icon.classList.add('ring-2', 'ring-blue-500', 'rounded-full', 'p-1', '-m-1', 'mood-icon-active');
            icon.classList.remove('opacity-50');
            
            // Optional: Log the selected mood
            console.log('Mood selected:', icon.dataset.mood);
        });
    });

    // --- AI Companion Button Logics (Placeholders) ---
    document.getElementById('guided-activities')?.addEventListener('click', () => {
        alert("Navigating to Guided Wellness Activities!");
    });

    document.getElementById('mood-check-btn')?.addEventListener('click', () => {
        alert("AI is initiating a Mood Check!");
    });

    document.getElementById('coping-tips-btn')?.addEventListener('click', () => {
        alert("AI is providing Coping Tips based on recent entries!");
    });
    
    document.getElementById('settings-btn')?.addEventListener('click', () => {
        alert("Opening Settings Panel!");
    });


    // Initialize the dynamic content
    initializeContent();
});