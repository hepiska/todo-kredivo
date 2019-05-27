import React, { useState, useEffect } from 'react'
import { Wrapper, ImageWrapper, PlainLink } from 'atoms'
import Sidebar from '@pomona/pomona3-ui/lib/molecules/sidebar'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import { colors } from '@pomona/pomona3-ui/lib/constants'

const data = {
  "rows": [
    {
      "id": "nav-1",
      "title": "Cashback Bank",
      "url": null,
      "isActive": false,
      "menu": [
        {
          "id": "nav-1-sub-1",
          "title": "Cashback Earned",
          "url": "/cashback",
          "isActive": false,
        },
        {
          "id": "nav-1-sub-2",
          "title": "Cashout",
          "url": "/cashout",
          "isActive": false,
        },
        {
          "id": "nav-1-sub-3",
          "title": "Pending Cashout",
          "url": "/pending",
          "isActive": false,
        }
      ]
    },
    {
      "id": "nav-2",
      "title": "User",
      "url": null,
      "isActive": false,
      "menu": [
        {
          "id": "nav-2-sub-1",
          "title": "All User",
          "url": "/users",
          "isActive": false,
        },
        {
          "id": "nav-2-sub-2",
          "title": "Rating",
          "url": "/rating",
          "isActive": false,
        },
        {
          "id": "nav-2-sub-3",
          "title": "Survei",
          "url": "/survei",
          "isActive": false,
        }
      ]
    },
    {
      "id": "nav-3",
      "title": "Campaign",
      "url": null,
      "isActive": false,
      "menu": [
        {
          "id": "nav-3-sub-1",
          "title": "Campaign",
          "url": "/campaign",
          "isActive": false,
        },
        {
          "id": "nav-3-sub-2",
          "title": "Coupons",
          "url": "/coupons",
          "isActive": false,
        },
        {
          "id": "nav-3-sub-3",
          "title": "Ads",
          "url": "/ads",
          "isActive": false,
        }
      ]
    },
    {
      "id": "nav-4",
      "title": "Product",
      "url": null,
      "isActive": false,
      "menu": [
        {
          "id": "nav-4-sub-1",
          "title": "All Product",
          "url": "/products",
          "isActive": false,
        },
        {
          "id": "nav-4-sub-2",
          "title": "Featured",
          "url": "/featured",
          "isActive": false,
        },
        {
          "id": "nav-4-sub-3",
          "title": "Category",
          "url": "/category",
          "isActive": false,
        },
        {
          "id": "nav-4-sub-4",
          "title": "Tags",
          "url": "/tags",
          "isActive": false,
        }
      ]
    },
    {
      "id": "nav-5",
      "title": "Company",
      "url": null,
      "isActive": false,
      "menu": [
        {
          "id": "nav-5-sub-1",
          "title": "Group",
          "url": "/group",
          "isActive": false,
        },
        {
          "id": "nav-5-sub-2",
          "title": "Brand",
          "url": "/brand",
          "isActive": false,
        },
        {
          "id": "nav-5-sub-3",
          "title": "Retail",
          "url": "/retail",
          "isActive": false,
        }
      ]
    },
    {
      "id": "nav-6",
      "title": "CMS",
      "url": null,
      "isActive": false,
      "menu": [
        {
          "id": "nav-6-sub-1",
          "title": "QR Code",
          "url": "/qrcode",
          "isActive": false,
        },
        {
          "id": "nav-6-sub-2",
          "title": "About Pomona",
          "url": "/about-pomona",
          "isActive": false,
        },
        {
          "id": "nav-6-sub-3",
          "title": "Content",
          "url": "content",
          "isActive": false,
        },
        {
          "id": "nav-6-sub-3",
          "title": "Collection",
          "url": "/collection",
          "isActive": false,
        },
        {
          "id": "nav-6-sub-4",
          "title": "Pop Up",
          "url": "/popup",
          "isActive": false,
        }
      ]
    },
    {
      "id": "nav-7",
      "title": "Pomona",
      "url": null,
      "isActive": false,
      "menu": [
        {
          "id": "nav-7-sub-1",
          "title": "About Pomona",
          "url": "/about",
          "isActive": false,
        },
        {
          "id": "nav-7-sub-2",
          "title": "FAQ",
          "url": "/faq",
          "isActive": false,
        },
        {
          "id": "nav-7-sub-3",
          "title": "Term & Condition",
          "url": "/tnc",
          "isActive": false,
        },
        {
          "id": "nav-7-sub-4",
          "title": "Term of Use",
          "url": "/terms-of-use",
          "isActive": false,
        },
        {
          "id": "nav-7-sub-5",
          "title": "Privacy Policy",
          "url": "/privacy-policy",
          "isActive": false,
        },
        {
          "id": "nav-7-sub-6",
          "title": "Jobs",
          "url": "/jobs",
          "isActive": false,
        },
      ]
    },
    {
      "id": "nav-8",
      "title": "Log",
      "url": "log",
      "isActive": false,
      "menu": []
    }
  ]
}

const SideMenu = (props) => {
  const [listMenu, setListMenu] = useState(data.rows)

  function handleActiveMenu(url) {
    const newListMenu = [...listMenu].map(item => {
      if (item.menu.length) {
        item.menu.map(x => {
          x.isActive = x.url === url
          return x
        })
        return item
      } else {
        item.isActive = item.url === url
      }
      return item
    })
    setListMenu(newListMenu)
  }

  useEffect(() => {
    handleActiveMenu(props.location.pathname)
  }, [])

  const menuClick = (url, item) => {
    handleActiveMenu(url)
    return props.history.push({
      pathname: url,
      state: {
        title: item.title
      }
    })
  }

  const signOutClick = () => {
    alert('Sign Out')
  }

  useEffect(() => {
    const url = props.location.pathname.replace('/', '')
    handleActiveMenu(url)
  }, [])

  return (
    <Sidebar position="static">

      <Wrapper width="100%" margin="32px 0">
        <ImageWrapper width="64px" height="64px" margin="0 0 16px 0" src={require('img/svg/pomona-blue-logo-only.svg')} />
        <Font size="16px" weightType="semibold">CRM APP</Font>
      </Wrapper>

      {
        listMenu &&
        <Sidebar.Menu onClick={menuClick} >
          {
            listMenu.map(item => {
              if (item.menu.length) {
                return (
                  <Sidebar.Collapse key={item.id} data={item} />
                )
              }
              return (
                <Sidebar.Item key={item.id} item={item} />
              )
            })
          }
        </Sidebar.Menu>
      }

      <Wrapper align="flex-start" width="100%" margin="20px 32px">
        <Font size="20px" weightType="semibold">Agung</Font>
        <Font size="12px">Frontend Developer</Font>
        <PlainLink color={colors.pomonaBlue} size="16px" margin="8px 0" onClick={signOutClick}>
          Sign Out
        </PlainLink>
      </Wrapper>

    </Sidebar>
  )
}


export default SideMenu