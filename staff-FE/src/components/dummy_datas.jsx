const guest = {
    "fname":"Joe", 
    "lname":"Doe",
    "active":true,
    "id":1,
    "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4TaCgyT84ax_lVhjqJfAu490Ogi6qrNEay6k2jRzJ9lDd5AdxPmVoshlYPGinuk3a44&usqp=CAU"
    
    }

const contactInfo = {
    "contact_information": {
      "phone": "+25191123456",
      "email": "hasset_molla@email.com",
      "address": {
        "street": "123 Street Name",
        "city": "City",
        "country": "Ethiopia"
      },
      "passport": "****7890"
    }
  }
const bookingHistory = {"bookings":[
    {
      id: "BK-1234",
      room: "301",
      checkIn: "Aug 10, 2023",
      checkOut: "Aug 15, 2023",
      totalCost: "$1,200",
      status: "Completed"
    },
    {
      id: "BK-1235",
      room: "405",
      checkIn: "Jul 22, 2023",
      checkOut: "Jul 25, 2023",
      totalCost: "$750",
      status: "Completed"
    },
    {
      id: "BK-1236",
      room: "210",
      checkIn: "Sep 5, 2023",
      checkOut: "Sep 10, 2023",
      totalCost: "$900",
      status: "Completed"
    },
    {
      id: "BK-1237",
      room: "315",
      checkIn: "Oct 15, 2023",
      checkOut: "Oct 20, 2023",
      totalCost: "$1,050",
      status: "Pending"
    },
    {
      id: "BK-1238",
      room: "102",
      checkIn: "Nov 2, 2023",
      checkOut: "Nov 7, 2023",
      totalCost: "$800",
      status: "Cancelled"
    },
    {
      id: "BK-1239",
      room: "501",
      checkIn: "Dec 10, 2023",
      checkOut: "Dec 15, 2023",
      totalCost: "$1,500",
      status: "Completed"
    }
  ]
  }  

  const preferences = {
    "room":"x",
    "bed":"king",
    "floor":"high floor",
    "view":"Ocean view",
    "smoking":false,
    "special": "extra pillows"
    }
    const currentBooking = {
        "room": "301",
        "checkIn": "Aug 10, 2023",
        "checkOut": "Aug 15, 2023",
        "totalCost": "$1,200",
        "status": "Completed"
    }

export {guest, contactInfo, bookingHistory, preferences, currentBooking};