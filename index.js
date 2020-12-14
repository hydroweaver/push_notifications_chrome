//https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679

console.log('js is working');

const check = () => {
    if(!('serviceWorker' in navigator)){
        console.log('sw missing');
    }
    if(!('PushManager' in window)){
        console.log('pm missing');
    }
}

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body: body
      };
    swRegistration.showNotification(title, options);
}

const registerServiceWorker = async ()=>{
    const swRegistration  = await navigator.serviceWorker.register('service.js');
    return swRegistration;
}

const requestNotificationPermission = async () =>{
    const permission = await window.Notification.requestPermission();
    if(permission != 'granted'){
        console.log("Permission Denied");
    }
}

const main = async() => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission().then(()=>{
        showLocalNotification('This is title', 'this is body', swRegistration);
    });
  }