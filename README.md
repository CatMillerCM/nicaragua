# RavePI

Welcome to Nicaragua's project: RavePI.

This repository contains both a backend API and a basic frontend app that allows the user to view and filter Nicaragua's best backpacker parties!

For the custom made API, I created a database using SQLite and then build 3 key endpoints using an Express app.

I was eager to throw myself back into the backend for this project, and really enjoyed refamiliarising myself with SQL commands and endpoint creation, plus comprehensive testing!

Have a play about and see which party takes your fancy, or filter down to your desired day or location.

Frontend hosted independently [here](https://nicaragua.cat-miller.com/).
Backend hosted independently [here](https://nicaragua-api.cat-miller.com/parties).

A full write up, with further information about the project, can be found on [What's My Country Code - Nicaragua](https://whatsmycountrycode.cat-miller.com/nicaragua).

## API Documentation

### /parties
Returns all parties as an array of objects.

Eg,
```
  [
    {
      id : 1,
      name : "Sunday Funday",
      day : "sunday",
      location : "san juan del sur",
      organising_venue : "Pachamama Hostel",
      instagram : "sundayfunday_poolcrawl",
      image : "https://sundayfundaynicaragua.com/wp-content/uploads/sb-instagram-feed-images/475795917_661404632889840_9185867056562940621_nfull.webp"
    },
    {
      ...
    }
  ]
```


### /parties?location={location}&day={day}
Returns all parties that match the given filters as an array of objects.

Currently accepted parameter values:
Location: Granada, Las Peñitas, León, Little Corn, Ometepe, Popoyo, San Juan Del Sur
Day: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Fluctuating

Eg,
```
  [
    {
      id : 2,
      name : "Wet Wednesday",
      day : "wednesday",
      location : "ometepe",
      organising_venue : "Raindance Hostel",
      instagram : "raindance.ometepe",
      image : "https://a.hwstatic.com/image/upload/f_auto,q_auto,t_40/propertyimages/3/323051/n1kocw01526j00mm9ldv.jpg"
    },
    {
      ...
    }
  ]
```

### /parties/:party
Returns the specified party's data as an object.

Currently accepted parameter values:
Party: sunday-funday, wet-wednesdays, chicken-bus-bar-crawl, treehouse, booze-cruise, popoyos-secret, beach-party, volcano-boarding-party-bus, pizza-night-dj-party, full-moon-boat-party, dance-night

Eg,
```
  {
    id : 1,
    name : "Sunday Funday",
    day : "sunday",
    location : "san juan del sur",
    organising_venue : "Pachamama Hostel",
    instagram : "sundayfunday_poolcrawl",
    image : "https://sundayfundaynicaragua.com/wp-content/uploads/sb-instagram-feed-images/475795917_661404632889840_9185867056562940621_nfull.webp"
  }
```

### /locations
Returns all locations as an array.

```
["san juan del sur","ometepe","león","granada","popoyo","las peñitas","little corn"]
```
