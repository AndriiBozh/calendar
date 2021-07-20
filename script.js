import {
  format,
  getUnixTime,
  fromUnixTime,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isSunday,
} from "date-fns";

const openCloseCalendarBtn = document.querySelector(".open-calendar-btn");
const calendar = document.querySelector(".calendar");
const currentDateDisplay = document.querySelector(".current-date-display");
const calendarHeaderCurrentMonth = document.querySelector(".current-month");
const nextMonthBtn = document.querySelector(".next-month-btn");
const prevMonthBtn = document.querySelector(".previous-month-btn");
const daysContainer = document.querySelector(".days-nums");

openCloseCalendarBtn.addEventListener("click", () => {
  calendar.classList.toggle("hide-calendar");
  openCloseCalendarBtn.innerHTML === "Open Calendar"
    ? (openCloseCalendarBtn.innerHTML = "Close Calendar")
    : (openCloseCalendarBtn.innerHTML = "Open Calendar");
});

function setDisplayCurrentDate(date) {
  currentDateDisplay.innerHTML = format(date, "MMMM do, yyyy");
}

function getCurrentDate(date) {
  calendarHeaderCurrentMonth.innerHTML = format(date, "MMMM - yyyy");
  currentDateDisplay.dataset.selectedDate = getUnixTime(date);

  const startDayOfMonth = startOfMonth(
    fromUnixTime(currentDateDisplay.dataset.selectedDate)
  );
  const endDayOfMonth = endOfMonth(
    fromUnixTime(currentDateDisplay.dataset.selectedDate)
  );
  //   first day in a calendar table
  const startDayOfStartOfMonth = startOfWeek(startDayOfMonth, {
    weekStartsOn: 1,
  });
  //   last day in a calendar table
  const endDayOfEndOfMonth = endOfWeek(endDayOfMonth, { weekStartsOn: 1 });

  const days = eachDayOfInterval({
    start: startDayOfStartOfMonth,
    end: endDayOfEndOfMonth,
  });

  days.forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-num");
    dayContainer.innerHTML = day.getDate();
    if (isSameDay(day, new Date())) {
      dayContainer.classList.add("current-day");
    }
    if (!isSameMonth(day, endDayOfMonth)) {
      dayContainer.classList.add("other-month-day");
    }
    if (isSunday(day)) {
      dayContainer.classList.add("day-off");
    }
    daysContainer.appendChild(dayContainer);
  });
}

setDisplayCurrentDate(new Date());
getCurrentDate(new Date());

nextMonthBtn.addEventListener("click", () => {
  daysContainer.innerHTML = "";
  calendarHeaderCurrentMonth.innerHTML = format(
    addMonths(fromUnixTime(currentDateDisplay.dataset.selectedDate), 1),
    "MMMM yyyy"
  );
  currentDateDisplay.dataset.selectedDate = getUnixTime(
    addMonths(fromUnixTime(currentDateDisplay.dataset.selectedDate), 1)
  );
  getCurrentDate(fromUnixTime(currentDateDisplay.dataset.selectedDate));
});

prevMonthBtn.addEventListener("click", () => {
  daysContainer.innerHTML = "";
  calendarHeaderCurrentMonth.innerHTML = format(
    subMonths(fromUnixTime(currentDateDisplay.dataset.selectedDate), 1),
    "MMMM yyyy"
  );
  currentDateDisplay.dataset.selectedDate = getUnixTime(
    subMonths(fromUnixTime(currentDateDisplay.dataset.selectedDate), 1)
  );
  getCurrentDate(fromUnixTime(currentDateDisplay.dataset.selectedDate));
});
