/** Posts reales de @infinita_fashionstore — imágenes en /public/demos/infinita + CDN fallback. */

export type InfinitaPost = {
  code: string;
  postUrl: string;
  localPath: string;
  /** CDN de respaldo si el archivo local es inválido o muy liviano. */
  cdnUrl: string;
};

export const INFINITA_INSTAGRAM_POSTS: InfinitaPost[] = [
  {
    code: "Cw5P4XzgGuT",
    postUrl: "https://www.instagram.com/p/Cw5P4XzgGuT/",
    localPath: "/demos/infinita/ig-01.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/659049123_18335845627171386_1914632811006948098_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=CiCAlig8cTsQ7kNvwHuopIW&_nc_oc=Adpwl0Ab1t7bdRsZGsPT9Ji9RaMhoBxMw2bH5RLnoXb3YMqNVzb31BsGQvYi70z7lt8&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=VzO47Tl8WlX2ira5_z699A&_nc_ss=7f60f&oh=00_Af7MH3tFkKcDn6yvjkj1xEjh8ufNkIJSm_G3h6NAJiGhbA&oe=6A0FE752",
  },
  {
    code: "CwxfoMKL2Ge",
    postUrl: "https://www.instagram.com/p/CwxfoMKL2Ge/",
    localPath: "/demos/infinita/ig-02.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/654023708_18086502905191024_3031519829045543355_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=_xozw3xiE9wQ7kNvwH6Sf1M&_nc_oc=AdqYk_IfpsGZOcMSEFjCq-EUkkApJI2ZCrBRMWHNlwNHyfIr1TXKdg-b0B256joai-s&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=PBG0-DaNN03m0_sxC_8-vw&_nc_ss=7f60f&oh=00_Af4FcWkCm2XbUGjLcK7NobUCOsOntlM-FSNVcEczWzbdvA&oe=6A0FE947",
  },
  {
    code: "Cv3C9Z2RqDC",
    postUrl: "https://www.instagram.com/p/Cv3C9Z2RqDC/",
    localPath: "/demos/infinita/ig-03.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/655239272_18085670548998901_374538999550866978_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=100&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=5w3UZ_yzhcMQ7kNvwEk1a8d&_nc_oc=AdqRfr-sLpreZZ3R0iaGeGU2RWtb1tmViE8kgmBPhmJ1pv2iSpfIN11gTLcdQInT9dU&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=cZMUzJiIzeYkZkJZYh8YGg&_nc_ss=7f60f&oh=00_Af7JZ79fgYkX9BaTU49cVLvTCl5NPfex_Ab1WjmVKIb98g&oe=6A101504",
  },
  {
    code: "Cv0k77CRzDY",
    postUrl: "https://www.instagram.com/p/Cv0k77CRzDY/",
    localPath: "/demos/infinita/ig-04.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/651362818_18062135117664992_5081168795744910600_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=jA8i8K_HvsIQ7kNvwHoBO5V&_nc_oc=Adq2s8l8PETIqQoeXa8PSR_IdTpNB9mkc6IOsF5aEnRW5v3SfztVeqlAToLv0VKf_Ro&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=C4M1qszID87Wip-jrH1_MQ&_nc_ss=7f60f&oh=00_Af6Z9ds6ROIGT8ZNxpXpEB4JpHwYbK1HY113V3lmN2iwog&oe=6A10106D",
  },
  {
    code: "CvxMQT0gXh6",
    postUrl: "https://www.instagram.com/p/CvxMQT0gXh6/",
    localPath: "/demos/infinita/ig-05.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/659800102_18581431414028335_1480253983543193891_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=aG2GgcNkgeQQ7kNvwEMz5NH&_nc_oc=AdrCjhPk1shrjk9HXWif89t_5aFU_39GB70cdbnBeeIg1uRpR7ANo8HtCTX2z2BgLNU&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=WGs1gUH29fYCSoqF9ND4tg&_nc_ss=7f60f&oh=00_Af6WIfvFpZtv1PcdbDUiS7Y7fwHliMXc9YQ3hoIWkVcuGQ&oe=6A0FEB7B",
  },
  {
    code: "CvpfI9zrIy4",
    postUrl: "https://www.instagram.com/p/CvpfI9zrIy4/",
    localPath: "/demos/infinita/ig-06.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/650397940_18001307219902242_295907557300326427_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=5-tLjl9C6x8Q7kNvwGUe1W-&_nc_oc=Adpt6BlFjF9mBhYbMTWhNqs0YO_e3fn29uRYGmPVEupruLPveal_ayJJ0LUIYVaBfrA&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=3BoMxqXWJVNq5vIq-Mlf8A&_nc_ss=7f60f&oh=00_Af6MgCERhBsmSaqtSsoHKWv9nKcHaR_iDVOGvXYJe3VE-w&oe=6A10040C",
  },
  {
    code: "CvpdiT6AcYR",
    postUrl: "https://www.instagram.com/p/CvpdiT6AcYR/",
    localPath: "/demos/infinita/ig-07.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/654850609_18072227126532566_8432003540843139119_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=F9GI5CeM9zIQ7kNvwFt0fqx&_nc_oc=AdqKaCcczCgh1Cwml6AZputbYFks9ldpB3Ye_T5mFcP1-dLZwmI4ZS8ZBsDxP04lGsE&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=QdeXkX3BMFL7Lb3X9OFQgg&_nc_ss=7f60f&oh=00_Af7omLndLHDv0baxUiX_h-ubL-9fn0XgU1uyDKGOxwX7OQ&oe=6A0FF2B4",
  },
  {
    code: "CvpcYX2AF_W",
    postUrl: "https://www.instagram.com/p/CvpcYX2AF_W/",
    localPath: "/demos/infinita/ig-08.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/656577232_18246236863306351_4222345434009585906_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=qQ6noEIqf40Q7kNvwHiuQM6&_nc_oc=AdqF_PGV9TbMXB0GJ1Z1g-KIM3FekazOBXjC7mDKzRfRYOGtBuM7YEzOMrPAZ-L7E7g&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=QVpPIyBWuvUnFjhcSnDHcQ&_nc_ss=7f60f&oh=00_Af7IRs6OlVsDtpYtHXDJ60o-nl9XgRtT5fyF_rRnD13KYA&oe=6A0FFA3C",
  },
  {
    code: "Cp05BVArU4N",
    postUrl: "https://www.instagram.com/p/Cp05BVArU4N/",
    localPath: "/demos/infinita/ig-09.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/654012715_18077619191113148_7577358868161716307_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=eBlRCcqyxokQ7kNvwG7cQnz&_nc_oc=AdqLMVqVaf-dE5io7cZdcaOL2jJoWBHWIWqyO6-KF4M1eoL_yvXSTcmRCoPyT6s7pgA&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=MExxd8-10BkjFI32jejlvg&_nc_ss=7f60f&oh=00_Af4-XB6lp-j5iHb0uiGSDiUJ-R2qQBOxBLMpgbiHQQ3ApA&oe=6A0FEC72",
  },
  {
    code: "Cp04gZRrneb",
    postUrl: "https://www.instagram.com/p/Cp04gZRrneb/",
    localPath: "/demos/infinita/ig-10.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/654582580_18146969032474531_484425146928308729_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=wNDb8FDKgNEQ7kNvwFBK60i&_nc_oc=Adr5z_fZy1isOLSfI93RWO2YJa8SmIWJQu3WAZIiM5toCj2O6BIr7uZjO3_uzoT7R0U&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=e54-FeDRn03NGVbylOwPTQ&_nc_ss=7f60f&oh=00_Af5Sx6-xYCvY7NVR4pjZCmuhrR7xpMUwvzR8P4XAL_RkZw&oe=6A0FFCFD",
  },
  {
    code: "Cp04Ed0rLsn",
    postUrl: "https://www.instagram.com/p/Cp04Ed0rLsn/",
    localPath: "/demos/infinita/ig-11.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/655584421_17982661091805679_7802434059029410006_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=hUuxo-u8MsUQ7kNvwHfAysl&_nc_oc=AdrIRLeolKMSuMLX3fNGuIW5iLV7ezTpW1jmm8BIzm1zFGndGSLNt7cBi9cdW48-S5g&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=N5-396s2NW4yFA1ufQRDtA&_nc_ss=7f60f&oh=00_Af4IdKhadvrdfo8aEyJZKbzXqo4Tm7DBpAC5OEiycYLSgA&oe=6A0FFDF1",
  },
  {
    code: "Cme89qpJVyU",
    postUrl: "https://www.instagram.com/p/Cme89qpJVyU/",
    localPath: "/demos/infinita/ig-12.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/651023057_18003988565714907_8086786936853961080_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=qWODJhDeGUoQ7kNvwHtxvmI&_nc_oc=AdqsS-qyJGttSUG1xHCWIdHNUj5DHYj2d58unnbu9BSvepGTYMxPUIXO_x_4Ywu9C6Q&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=Egn_1ANF1BZkMxYTlMh9fA&_nc_ss=7f60f&oh=00_Af6k8-d5YCAsapmRq6T0xHBwIsq_pgLf3Pn9suDnepOPPw&oe=6A0FF71B",
  },
  {
    code: "CmQCoCmOcVf",
    postUrl: "https://www.instagram.com/p/CmQCoCmOcVf/",
    localPath: "/demos/infinita/ig-13.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/500652131_1726475961592469_403439343502005003_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=UQa10yCWkgQQ7kNvwG6dDk3&_nc_oc=Ado0E2lJBiv7399Xw9BWTUFfi3mvJ7pF4XCjeveZHBmpeBISDBx0WyFvtiJ8cAcECcs&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=BhwpagxBDJJQLdQLreE1MA&_nc_ss=7f60f&oh=00_Af7NqxRKmcqYzu3qYm1sol2WS0ngux_Rg2p5aUfJpAs6ew&oe=6A0FF383",
  },
  {
    code: "ClYza7KrMsh",
    postUrl: "https://www.instagram.com/p/ClYza7KrMsh/",
    localPath: "/demos/infinita/ig-14.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.82787-15/622526694_18083968747900280_8632646954529522539_n.jpg?stp=c192.0.576.576a_dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=CQyu3-dbpsIQ7kNvwHzJ_5Q&_nc_oc=Adpi0FPvIydVu36tua7U0UafAbXxX-M_1eQ3-v7NVAhSrZoJGqk8Ihp8OpyTOgOdEC8&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=Y-Gt-PRIPcz05mY_K5rBYA&_nc_ss=7f60f&oh=00_Af6VqUd8WiE00jKjvhzt00uLss7U_6H_Y6fp9O60UCMlNQ&oe=6A0FEB5F",
  },
  {
    code: "CkJUSlYLD1T",
    postUrl: "https://www.instagram.com/p/CkJUSlYLD1T/",
    localPath: "/demos/infinita/ig-15.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/496816162_1198126745104717_2298280709992123206_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=PtMeZkG0XeUQ7kNvwHktH34&_nc_oc=AdoRYdGrxN-hRCjMoe4q25S203dkWi3ZRRbWkYEfPN9DY72n8_g796ZcxjBim7Nlsh4&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=4ygsNojRq9CdrRcOhoC_-w&_nc_ss=7f60f&oh=00_Af7XWWfcDGViSb9VgFnCAIsHXQAHwnArrJpjonO-p8IcDw&oe=6A10174F",
  },
  {
    code: "CkGbvtrMGSk",
    postUrl: "https://www.instagram.com/p/CkGbvtrMGSk/",
    localPath: "/demos/infinita/ig-16.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/491421183_1206375121067500_8422771847148394748_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=wz4CAaTdUKMQ7kNvwGPKBqj&_nc_oc=AdrsV9kMkEsg-jzom_bvm7hX0GaxjAR1181e7KPOzinYvJEyjeHpWwsrjnsJwj4Pci8&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=wYWgqDSGfzK4WryryYTxhw&_nc_ss=7f60f&oh=00_Af7WfB9Who9v6Pgs_MWyKLWwurLKtWvN8H2RMDdlH0xKvA&oe=6A0FFD0C",
  },
  {
    code: "CkBdLD6sW1a",
    postUrl: "https://www.instagram.com/p/CkBdLD6sW1a/",
    localPath: "/demos/infinita/ig-17.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/491461463_1209677363981049_4167690190318833243_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=B6jT3ARFLb4Q7kNvwF6Kkhv&_nc_oc=Adrh2ECRnGs9JhQs9Pq3x5GlKhCsLM8ME1ztm2VHES3JvTwrNHP3jK65zizMewQfQQA&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=YxnUnPpUWfyPL5qr3fEd1A&_nc_ss=7f60f&oh=00_Af4p2zvSCYXXyUmaMU3pnbQ36TJSs9_a1a9-tyiOW3ue7w&oe=6A10088D",
  },
  {
    code: "Cj_yXXtjvqL",
    postUrl: "https://www.instagram.com/p/Cj_yXXtjvqL/",
    localPath: "/demos/infinita/ig-18.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/496827277_3983436381927427_8203403063951966426_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=q_K-rJn0szoQ7kNvwEDq_-P&_nc_oc=AdpaCD4dzb5Y83j3D_c_fQr9k-_lgverkWVush_rr8Dzd5tBwHyKqNX020rN3q6FDK0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=akd9JSgYl60b5XUVuTlZrQ&_nc_ss=7f60f&oh=00_Af6lErmWUpm7L4TW8vUp5eJoJOV8MeC0IctVFjlKNeDyJw&oe=6A100448",
  },
  {
    code: "CjyTzXSJR4k",
    postUrl: "https://www.instagram.com/p/CjyTzXSJR4k/",
    localPath: "/demos/infinita/ig-19.jpg",
    cdnUrl:
      "https://scontent.cdninstagram.com/v/t51.71878-15/496995400_2122436258220552_985805496894145811_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=tV4dhD4EjAoQ7kNvwHZ-4Ig&_nc_oc=AdqdQcQAGC37fl4MQdXIJLa1UgJrDHy71gKT048w2gIRcXYjIheX_pltABgpz6mWyDY&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=FsIfWT6-cjm7LfMkLRKQZg&_nc_ss=7f60f&oh=00_Af43nznYEMYzPY-f4B-sURKihGh9ag-bi_K0L4NG-ScR_Q&oe=6A0FEFEF",
  },
];

const MIN_LOCAL_BYTES = 12_000;

/** Prioriza archivo local; si es muy chico, usa CDN de Instagram. */
export function infinitaImageSrc(post: InfinitaPost): string {
  return post.cdnUrl;
}

/** Posts con archivo local corrupto o placeholder (<12KB). */
const CDN_FIRST_INDEX = new Set([12, 14, 15, 16, 17, 18]);

export function buildInfinitaInstagramMedia() {
  return INFINITA_INSTAGRAM_POSTS.map((post, i) => {
    const cdnFirst = CDN_FIRST_INDEX.has(i);
    return {
      id: `ig-${post.code}`,
      image: cdnFirst ? post.cdnUrl : post.localPath,
      fallbackImage: cdnFirst ? post.localPath : post.cdnUrl,
      alt: `INFINITA — look @infinita_fashionstore (${i + 1})`,
      postUrl: post.postUrl,
      kind: "image" as const,
    };
  });
}
