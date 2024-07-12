class Event {
  EventName: string;
  EventSource: string;
  Start: Date;
  End: Date;
  color: string;

  constructor(
    eventName: string,
    eventSource: string,
    start: string,
    end: string,
    color: string
  ) {
    this.EventName = eventName;
    this.EventSource = eventSource;
    this.Start = new Date(start);
    this.End = new Date(end);
    this.color = color;
  }
}

const testData: Event[] = [
  new Event(
    "LOADING",
    "Group1",
    "2024-06-17", // Example: dd mm yyyy (16 July 2024)
    "2025-12-01", // Example: dd mm yyyy (1 October 2024)
    "#4287f5"
  ),
  new Event(
    "lalaqwfqwffqwas",
    "Group2",
    "2024-07-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#74ccc2"
  ),
  new Event(
    "lalqwfqwfqwfaas",
    "Group3",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#eeff2e"
  ),
  new Event(
    "lalafqwfqwfqwas",
    "Group4",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#2b8054"
  ),
  new Event(
    "lalaas",
    "Group5",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#9c0812"
  ),
  new Event(
    "lalaas",
    "Group6",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#199e24"
  ),
  new Event(
    "lalaas",
    "Group7",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#1ff0d7"
  ),
  new Event(
    "lalaas",
    "Group8",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#74ccc2"
  ),
  new Event(
    "lalaas",
    "Group9",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#ad0c2a"
  ),
  new Event(
    "lalaas",
    "Group10",
    "2024-08-20", // Example: dd mm yyyy (20 August 2024)
    "2024-09-19", // Example: dd mm yyyy (19 September 2024)
    "#74ccc2"
  ),
  // Add more events as needed...
];

export default testData;
