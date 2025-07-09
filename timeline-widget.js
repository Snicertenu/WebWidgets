class TimelineWidget {
    constructor() {
        this.timelineData = [
            {
                id: 1,
                date: '2024',
                title: 'Project Launch',
                description: 'Initial project setup and development began. Core features were planned and implemented.',
                details: 'This phase included setting up the development environment, creating the basic project structure, and implementing the core functionality. The team worked on establishing coding standards and project guidelines.',
                status: 'completed',
                icon: '🚀'
            },
            {
                id: 2,
                date: '2024',
                title: 'Development Phase',
                description: 'Active development of widgets and features. Multiple iterations and improvements.',
                details: 'During this phase, we developed the weather widget, timezone widget, and timeline widget. Each widget went through multiple iterations with user feedback and testing. Performance optimizations were implemented.',
                status: 'completed',
                icon: '⚙️'
            },
            {
                id: 3,
                date: '2024',
                title: 'Testing & QA',
                description: 'Comprehensive testing across different browsers and devices.',
                details: 'Quality assurance testing was conducted across multiple browsers (Chrome, Firefox, Safari, Edge) and devices (desktop, tablet, mobile). Bug fixes and performance improvements were made based on test results.',
                status: 'active',
                icon: '🧪'
            },
            {
                id: 4,
                date: '2024',
                title: 'Deployment',
                description: 'Production deployment and monitoring setup.',
                details: 'The application was deployed to production servers with proper monitoring and logging. Performance metrics and error tracking were implemented to ensure smooth operation.',
                status: 'pending',
                icon: '🌐'
            },
            {
                id: 5,
                date: '2024',
                title: 'Future Enhancements',
                description: 'Planned features and improvements for future releases.',
                details: 'Future plans include adding more widgets, improving performance, enhancing the user interface, and adding new features based on user feedback and requirements.',
                status: 'pending',
                icon: '🔮'
            }
        ];
        this.init();
    }

    init() {
        this.createTimeline();
        this.addEventListeners();
    }

    createTimeline() {
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'timeline-container';
        
        const timelineHTML = `
            <div class="timeline-header">
                <h3>Project Timeline</h3>
                <div class="timeline-controls">
                    <button id="expand-all" class="timeline-btn">Expand All</button>
                    <button id="collapse-all" class="timeline-btn">Collapse All</button>
                </div>
            </div>
            <div class="timeline">
                ${this.timelineData.map((item, index) => this.createTimelineItem(item, index)).join('')}
            </div>
        `;
        
        timelineContainer.innerHTML = timelineHTML;
        
        // Insert into the widget content
        const widgetContent = document.querySelector('#timeline-widget .widget-content');
        widgetContent.appendChild(timelineContainer);
    }

    createTimelineItem(item, index) {
        const isActive = item.status === 'active';
        const isCompleted = item.status === 'completed';
        const isPending = item.status === 'pending';
        
        return `
            <div class="timeline-item ${item.status}" data-id="${item.id}">
                <div class="timeline-marker">
                    <div class="timeline-icon">${item.icon}</div>
                    <div class="timeline-line"></div>
                </div>
                <div class="timeline-content">
                    <div class="timeline-header" onclick="timelineWidget.toggleItem(${item.id})">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-status">
                            <span class="status-badge ${item.status}">${this.getStatusText(item.status)}</span>
                        </div>
                        <div class="timeline-toggle">
                            <span class="toggle-icon">+</span>
                        </div>
                    </div>
                    <div class="timeline-description">${item.description}</div>
                    <div class="timeline-details" style="display: none;">
                        <p>${item.details}</p>
                        <div class="timeline-actions">
                            <button class="action-btn edit-btn">Edit</button>
                            <button class="action-btn delete-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getStatusText(status) {
        const statusMap = {
            'completed': 'Completed',
            'active': 'In Progress',
            'pending': 'Pending'
        };
        return statusMap[status] || status;
    }

    addEventListeners() {
        // Expand all button
        document.getElementById('expand-all').addEventListener('click', () => {
            this.expandAll();
        });

        // Collapse all button
        document.getElementById('collapse-all').addEventListener('click', () => {
            this.collapseAll();
        });
    }

    toggleItem(itemId) {
        const item = document.querySelector(`[data-id="${itemId}"]`);
        const details = item.querySelector('.timeline-details');
        const toggleIcon = item.querySelector('.toggle-icon');
        
        if (details.style.display === 'none') {
            details.style.display = 'block';
            toggleIcon.textContent = '−';
            item.classList.add('expanded');
        } else {
            details.style.display = 'none';
            toggleIcon.textContent = '+';
            item.classList.remove('expanded');
        }
    }

    expandAll() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => {
            const details = item.querySelector('.timeline-details');
            const toggleIcon = item.querySelector('.toggle-icon');
            details.style.display = 'block';
            toggleIcon.textContent = '−';
            item.classList.add('expanded');
        });
    }

    collapseAll() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => {
            const details = item.querySelector('.timeline-details');
            const toggleIcon = item.querySelector('.toggle-icon');
            details.style.display = 'none';
            toggleIcon.textContent = '+';
            item.classList.remove('expanded');
        });
    }
}

// Initialize the timeline widget when the DOM is loaded
let timelineWidget;
document.addEventListener('DOMContentLoaded', () => {
    timelineWidget = new TimelineWidget();
}); 