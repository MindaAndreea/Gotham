document.addEventListener("DOMContentLoaded", function () {
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");
  const monthYearDisplay = document.getElementById("monthYear");
  const calendarBody = document.getElementById("calendarBody");

  let currentDate = new Date(2033, 5, 1);
  let selectedDateElement = null;

  function generateCalendar(date) {
    calendarBody.innerHTML = "";
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    monthYearDisplay.innerHTML = `<p>${date.toLocaleString("default", {
      month: "long",
    })} ${year}</p>`;

    let dateHTML = "";
    let dayCount = 0;

    for (let i = 0; i < firstDay; i++) {
      dateHTML += `<td class="color-lighter">${
        prevMonthLastDate - firstDay + 1 + i
      }</td>`;
      dayCount++;
    }

    for (let day = 1; day <= lastDate; day++) {
      if (dayCount % 7 === 0) {
        dateHTML += "</tr><tr>";
      }
      dateHTML += `<td data-day="${day}">${day}</td>`;
      dayCount++;
    }

    for (let i = dayCount; i % 7 !== 0; i++) {
      dateHTML += `<td class="color-lighter">${i - dayCount + 1}</td>`;
    }

    calendarBody.innerHTML = `<tr>${dateHTML}</tr>`;
    calendarBody.querySelectorAll("td[data-day]").forEach((cell) => {
      cell.addEventListener("click", function () {
        if (selectedDateElement) {
          selectedDateElement.classList.remove("current-date");
        }
        cell.classList.add("current-date");
        selectedDateElement = cell;
      });
    });
  }

  function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    generateCalendar(currentDate);
  }

  prevMonthButton.addEventListener("click", () => changeMonth(-1));
  nextMonthButton.addEventListener("click", () => changeMonth(1));

  generateCalendar(currentDate);
});
