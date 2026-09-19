import type { Flow, FlowKey } from '../types';

export const FLOWS: Record<FlowKey, Flow> = {
 acq:{
  title:"Acquisition process",
  box:{x:25,y:192,w:350,h:136,label:"Hybris",lx:44,ly:216},
  nodes:[
   {id:"shop",sys:"shop",x:100,y:260,rx:62,ry:44,l:["Shop"]},
   {id:"om",sys:"om",x:290,y:260,rx:74,ry:48,l:["Order","Manager"]},
   {id:"excal",sys:"excal",x:290,y:66,rx:76,ry:36,l:["Excalibur"]},
   {id:"report",kind:"doc",x:470,y:262,rx:62,ry:30,l:["Order report"],info:"Hybris order report. This feeds the Hybris 30 day file, which lists all orders taken through the Digital Shop site."},
   {id:"sap1",sys:"sap",x:570,y:150,rx:50,ry:34,l:["SAP"],basket:"single"},
   {id:"ful1",kind:"plain",x:740,y:150,rx:56,ry:32,l:["Delivery"],basket:"single",info:"Goods leave the warehouse for the customer."},
   {id:"cus1",kind:"cust",x:900,y:150,rx:78,ry:40,l:["Order auto-","fulfilled"],basket:"single",info:"Auto fulfilment, as long as there were no issues with the order during the online purchase."},
   {id:"csa",kind:"actor",x:290,y:452,rx:70,ry:34,l:["EE CS agent"],basket:"multi",info:"An EE Customer Services agent. Agents use Order Manager to review and action orders."},
   {id:"sap2",sys:"sap",x:570,y:385,rx:50,ry:34,l:["SAP"],basket:"multi"},
   {id:"ful2",kind:"plain",x:740,y:385,rx:56,ry:32,l:["Delivery"],basket:"multi",info:"Goods leave the warehouse for the customer."},
   {id:"cus2",kind:"cust",x:900,y:385,rx:78,ry:40,l:["Order manually","fulfilled"],basket:"multi",info:"Manual fulfilment, after a CS agent has actioned the order."}
  ],
  edges:[
   {id:"e1",a:"shop",b:"om"},
   {id:"eapi",a:"om",b:"excal",label:"API"},
   {id:"erep",a:"om",b:"report",dashed:true},
   {id:"es1",a:"om",b:"sap1",label:"Single basket",basket:"single"},
   {id:"ef1",a:"sap1",b:"ful1",basket:"single"},
   {id:"ec1",a:"ful1",b:"cus1",basket:"single"},
   {id:"ecsa",a:"csa",b:"om",basket:"multi"},
   {id:"es2",a:"om",b:"sap2",label:"Multi basket",basket:"multi"},
   {id:"ef2",a:"sap2",b:"ful2",basket:"multi"},
   {id:"ec2",a:"ful2",b:"cus2",basket:"multi"}
  ],
  steps:[
   {title:"The customer places an order in EE Shop",text:"A new customer has been through the Acquisition pages and submits their basket on the Hybris-based EE Shop.",nodes:["shop"],edges:[]},
   {title:"The order lands in Order Manager",text:"EE Shop hands the order to Hybris Order Manager, where it is recorded with an Order Status.",nodes:["shop","om"],edges:["e1"]},
   {title:"The customer account is created in Excalibur",text:"Through an API call, the customer's billing account is created in Excalibur, the customer billing account system.",nodes:["om","excal"],edges:["eapi"]},
   {title:"A Hybris order report is generated",text:"The order shows up in the Hybris order report, the source of the Hybris 30 day file of all Digital Shop orders.",nodes:["om","report"],edges:["erep"]},
   {basket:"single",title:"Single basket: straight through SAP",text:"One product in the basket. Order Manager passes the order to SAP and the goods are dispatched. If nothing went wrong during the online purchase, the order is auto-fulfilled.",nodes:["om","sap1","ful1","cus1"],edges:["es1","ef1","ec1"]},
   {basket:"multi",title:"Multi basket: a CS agent steps in",text:"More than one product in the basket. An EE CS agent reviews and actions the order in Order Manager.",nodes:["csa","om"],edges:["ecsa"]},
   {basket:"multi",title:"Multi basket: SAP, then manual fulfilment",text:"After the agent has actioned it, the order goes to SAP and is fulfilled manually.",nodes:["om","sap2","ful2","cus2"],edges:["es2","ef2","ec2"]}
  ]},
 upg:{
  title:"Upgrade and Add Line process",
  box:{x:140,y:196,w:400,h:292,label:"Hybris",lx:158,ly:474},
  nodes:[
   {id:"login",kind:"entry",x:66,y:330,rx:52,ry:36,l:["Login"],info:"Existing customers authenticate (L2). CPCI is the centralised login system that confirms identity."},
   {id:"shop",sys:"shop",x:240,y:262,rx:58,ry:42,l:["Shop"]},
   {id:"myee",kind:"plain",x:240,y:400,rx:48,ry:38,l:["My","EE"],info:"The customer self-service account (My EE Web and My EE App). A logged-in customer can arrive here and move on to the Shop."},
   {id:"om",sys:"om",x:440,y:300,rx:70,ry:46,l:["Order","Manager"]},
   {id:"report",kind:"doc",x:440,y:430,rx:62,ry:30,l:["Order report"],info:"Hybris order report. This feeds the Hybris 30 day file of all Digital Shop orders."},
   {id:"api",kind:"api",x:420,y:128,rx:28,ry:28,l:["API"],info:"Excalibur account data and Compass recommendations reach the Shop through an API."},
   {id:"excal",sys:"excal",x:610,y:58,rx:76,ry:34,l:["Excalibur"]},
   {id:"compass",sys:"compass",x:830,y:140,rx:74,ry:34,l:["Compass"]},
   {id:"sap",sys:"sap",x:640,y:300,rx:48,ry:34,l:["SAP"]},
   {id:"ful",kind:"plain",x:790,y:300,rx:54,ry:32,l:["Delivery"],info:"Goods leave the warehouse for the customer."},
   {id:"cus",kind:"cust",x:925,y:300,rx:68,ry:40,l:["Order auto-","fulfilled"],info:"Auto fulfilment, as long as there were no issues with the order during the online purchase."}
  ],
  edges:[
   {id:"l1",a:"login",b:"shop"},
   {id:"l2",a:"login",b:"myee"},
   {id:"m1",a:"myee",b:"shop"},
   {id:"x1",a:"excal",b:"api"},
   {id:"c1",a:"compass",b:"api"},
   {id:"a1",a:"api",b:"shop"},
   {id:"s1",a:"shop",b:"om"},
   {id:"r1",a:"om",b:"report",dashed:true},
   {id:"o1",a:"om",b:"sap"},
   {id:"f1",a:"sap",b:"ful"},
   {id:"k1",a:"ful",b:"cus"}
  ],
  steps:[
   {title:"The customer logs in",text:"An existing customer authenticates (L2). They can land in the Shop directly or in My EE, which links on to the Shop.",nodes:["login","shop","myee"],edges:["l1","l2","m1"]},
   {title:"Excalibur sends the customer's account",text:"The customer account is taken from Excalibur and sent to the EE Online Shop through an API. This gives the Shop the account and line details it needs to decide what to offer.",nodes:["excal","api","shop"],edges:["x1","a1"]},
   {title:"Compass sends upgrade recommendations",text:"Upgrade recommendations arrive from Compass and are displayed on the Shop's Upgrade Recommendations page when the customer logs in.",nodes:["compass","api","shop"],edges:["c1","a1"]},
   {title:"The order goes to Order Manager",text:"The customer completes the journey and the Shop sends the order on. This flow currently supports a single basket only, not multi basket.",nodes:["shop","om"],edges:["s1"]},
   {title:"A Hybris order report is generated",text:"As with acquisition, the order appears in the Hybris order report.",nodes:["om","report"],edges:["r1"]},
   {title:"SAP fulfils the order automatically",text:"The order flows through SAP to dispatch. If there were no issues during the online purchase, it is auto-fulfilled.",nodes:["om","sap","ful","cus"],edges:["o1","f1","k1"]}
  ]}
};
