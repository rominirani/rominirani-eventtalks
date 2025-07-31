document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const categorySearch = document.getElementById('category-search');
  const speakerSearch = document.getElementById('speaker-search');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      displayTalks(talks);
    });

  function filterTalks() {
    const categoryTerm = categorySearch.value.toLowerCase();
    const speakerTerm = speakerSearch.value.toLowerCase();

    const filteredTalks = talks.filter(talk => {
      const matchesCategory = talk.categories.some(category => category.toLowerCase().includes(categoryTerm));
      const matchesSpeaker = talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerTerm));
      return matchesCategory && matchesSpeaker;
    });

    displayTalks(filteredTalks);
  }

  categorySearch.addEventListener('input', filterTalks);
  speakerSearch.addEventListener('input', filterTalks);

  function displayTalks(talksToDisplay) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('1970-01-01T10:00:00');

    talksToDisplay.forEach((talk, index) => {
      const startTime = new Date(currentTime);
      const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

      const talkElement = document.createElement('div');
      talkElement.classList.add('talk');
      talkElement.innerHTML = `
        <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
        <h2>${talk.title}</h2>
        <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
        <p>${talk.description}</p>
        <div class="categories">
          ${talk.categories.map(c => `<span class="category">${c}</span>`).join('')}
        </div>
      `;
      scheduleContainer.appendChild(talkElement);

      currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break

      if (index === 2) { // Lunch break after the 3rd talk
        const lunchBreakElement = document.createElement('div');
        lunchBreakElement.classList.add('break');
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
        lunchBreakElement.textContent = `Lunch Break: ${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}`;
        scheduleContainer.appendChild(lunchBreakElement);
        currentTime = lunchEndTime;
      }
    });
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});