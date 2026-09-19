import type { SysId, SystemInfo, Team } from '../types';

export const SYSTEMS: Record<SysId, SystemInfo> = {
  excal:{name:"Excalibur",purpose:"Customer billing account system, also described as the CRM that holds key customer information",used:["Retail","CS staff","Digital online"],note:"For Digital online, the Hybris Shop connects to this system. One customer holds one BAN, which can have several CTNs attached.",team:"IT"},
  compass:{name:"Compass",purpose:"Recommendations system",used:["Retail","CS staff","Digital"],note:"For Digital, the Hybris Shop connects to this system.",team:"Compass Team"},
  myeeweb:{name:"My EE Web",purpose:"Customer account web self-service system",used:["Digital online"],team:"My EE Web Digital Team"},
  myeeapp:{name:"My EE App",purpose:"Customer account self-service app",used:["Digital online"],team:"My EE App Digital Team"},
  shop:{name:"Hybris EE Shop",purpose:"Online digital transaction system: Hybris e-commerce and product catalogue management software",used:["Digital online"],team:"Digital E Commerce Team"},
  aem:{name:"Adobe Experience Manager (AEM)",purpose:"Web Content Management System (WCMS): manages the images, text and video used across the website and app",used:["Digital online"],team:"Content Team",note:"Content layer, so it is not drawn in the order-flow diagrams."},
  om:{name:"Hybris EE Order Manager",purpose:"Online orders are recorded here with an Order Status. EE CS agents use it to review and action orders.",used:["Digital online"],team:"Digital E Commerce Team"},
  sap:{name:"SAP",purpose:"Used to fulfil orders",used:["Retail","CS staff","Digital online"],team:"IT"},
  cpci:{name:"CPCI",purpose:"Centralised login system used to confirm a customer's identity",used:[],team:null,note:"Defined in the terminology slides; it is not in the systems table, so no owning team is stated."}
};

export const TEAMS: Team[] = [
  {id:"ecom",name:"Digital E Commerce Team",sys:["shop","om"]},
  {id:"it",name:"IT",sys:["excal","sap"]},
  {id:"compass",name:"Compass Team",sys:["compass"]},
  {id:"content",name:"Content Team",sys:["aem"]},
  {id:"web",name:"My EE Web Digital Team",sys:["myeeweb"]},
  {id:"app",name:"My EE App Digital Team",sys:["myeeapp"]}
];
