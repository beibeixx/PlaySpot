// store all the helper function
import * as Notifications from "expo-notifications";

// Date formatting
export function formatDate(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  const dateString = date.toLocaleDateString("en-US", options);
  const [weekday, datePart] = dateString.split(", ");
  const [month, day, year] = datePart.split("/");
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${year}-${month}-${day} ${weekday} ${timeString}`;
}

//plan time setting format
export const timeOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
};

export const setDateWithoutSeconds = (date) => {
  const newDate = new Date(date);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

// generate nickname when signup
export const generateNickname = () => {
  const adjectives = [
    "Happy", "Bright", "Cool", "Super", "Awesome", 
    "Amazing", "Clever", "Lucky", "Sunny", "Swift"
  ];
  
  const nouns = [
    "Panda", "Tiger", "Eagle", "Dolphin", "Fox",
    "Star", "Moon", "Cloud", "River", "Forest"
  ];
  
  const randomNum = Math.floor(Math.random() * 9000 + 1000);
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}${noun}${randomNum}`;
}



//Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return false;
  }

  return true;
}

export async function scheduleNotification(title, body, triggerDate) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        date: triggerDate,
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });
    console.log(notificationId)
    return notificationId;
  } catch (error) {
    console.error("Error scheduling notification:", error);
    return null;
  }
}

export async function cancelNotification(notificationId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error("Error canceling notification:", error);
  }
}
