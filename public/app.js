document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchBar = document.getElementById('search-bar');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      displayTalks(talks);
    });

  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.categories.some(category => category.toLowerCase().includes(searchTerm))
    );
    displayTalks(filteredTalks);
  });

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