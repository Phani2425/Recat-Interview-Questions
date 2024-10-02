const data ={
    "navigation": [
      {
        "id": 1,
        "label": "Home",
        "link": "/home",
        "children": []
      },
      {
        "id": 2,
        "label": "About",
        "link": "/about",
        "children": []
      },
      {
        "id": 3,
        "label": "Services",
        "link": "/services",
        "children": [
          {
            "id": 4,
            "label": "Web Development",
            "link": "/services/web-development",
            "children": []
          },
          {
            "id": 5,
            "label": "Mobile Development",
            "link": "/services/mobile-development",
            "children": [
              {
                "id": 6,
                "label": "iOS Development",
                "link": "/services/mobile-development/ios",
                "children": []
              },
              {
                "id": 7,
                "label": "Android Development",
                "link": "/services/mobile-development/android",
                "children": []
              }
            ]
          },
          {
            "id": 8,
            "label": "SEO Services",
            "link": "/services/seo",
            "children": []
          }
        ]
      },
      {
        "id": 9,
        "label": "Contact",
        "link": "/contact",
        "children": []
      },
      {
        "id": 10,
        "label": "Support",
        "link": "/support",
        "children": [
          {
            "id": 11,
            "label": "FAQs",
            "link": "/support/faqs",
            "children": []
          },
          {
            "id": 12,
            "label": "Customer Support",
            "link": "/support/customer-support",
            "children": []
          }
        ]
      }
    ]
  }

  export default data;
  