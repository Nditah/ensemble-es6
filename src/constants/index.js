export const SYSTEM = {
  SMS_SENDER: "+12342175385",
};


export const HIRING_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  SCHEDULED: "SCHEDULED",
  FULFILLED: "FULFILLED",
  CLOSED: "CLOSED",
};

export const SCHEDULE_MODE = { DUMMY: "DUMMY", TIMELY: "TIMELY", DISABLE: "DISABLE" };

export const RESERVATION_STATUS = { BOARDED: "BOARDED", BOOKED: "BOOKED" };

export const SCHEDULE_STATUS = {
  QUEUING: "QUEUING",
  BOARDED: "BOARDED",
  LOADED: "LOADED",
  TRANSLOADED: "TRANSLOADED",
  WAYBILLED: "WAYBILLED",
  DEPARTED: "DEPARTED",
  ARRIVED: "ARRIVED",
};

export const BOOKING_STATUS = {
  SCHEDULED: "SCHEDULED",
  ARRIVED: "ARRIVED",
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  INITIATED: "INITIATED",
  ACCEPTED: "ACCEPTED",
  QUEUED: "QUEUED",
  ONGOING: "ONGOING",
  PARTNER_REACHED: "PARTNER_REACHED",
  PARTNER_ASSIGNED: "PARTNER_ASSIGNED",
  NO_SHOW: "NO_SHOW",
  TIMEOUT: "TIMEOUT",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  PARTNER_CANCELLED: "PARTNER_CANCELLED",
  CUSTOMER_CANCELLED: "CUSTOMER_CANCELLED",
  FAILED: "FAILED",
  STARTED: "STARTED",
  ON_THE_WAY: "ON_THE_WAY",
  DELIVERED: "DELIVERED",
  ENROUTE: "EN-ROUTE",
};

export const PAYMENT = {
  GATEWAY: {
    PAYSTACK: "PAYSTACK",
    STRIPE: "STRIPE",
    PAYPAL: "PAYPAL",
    GOOGLE_WALLET: "GOOGLE_WALLET",
    EWALLET: "EWALLET",
  },
  METHOD: {
    GATEWAY: "GATEWAY",
    POS: "POS",
    CASH: "CASH",
    CHEQUE: "CHEQUE",
    TRANSFER: "TRANSFER",
    USSD: "USSD",
    WALLET: "WALLET",
  },
  STATUS: { PENDING: "PENDING", SUCCESSFUL: "SUCCESSFUL", FAIL: "FAIL" },
};

export const GENDER = {
  MALE: "M",
  FEMALE: "F",
  OTHERS: "O",
};

export const MARITAL_STATUS = {
  SINGLE: "SINGLE",
  MARRIED: "MARRIED",
  DIVORSED: "DIVORSED",
  SEPARATED: "SEPARATED",
  WIDOWED: "WIDOWED",
};

export const PERSONAL_TITLE = {
  MR: "MR",
  MISS: "MISS",
  MRS: "MRS",
  DR: "DR",
  PROF: "PROF",
  ENGR: "ENGR",
  BARR: "BARR",
  FR: "FR",
  REV: "REV",
  PASTOR: "PASTOR",
  CHIEF: "CHIEF",
  HON: "HON",
  SIR: "SIR",
  MADAM: "MADAM",
};

export const ACCESS_LEVEL = [
  {
    name: "LOW",
    level: 0,
    user: "EMPLOYEE",
    description: "Cannot Access the ERP",
  },
  {
    name: "NORMAL",
    level: 1,
    user: "OFFICER",
    description: "Can only login and view ERP",
  },
  {
    name: "HIGH",
    level: 2,
    user: "UNIT_HEAD",
    description: "Can carry out all basic operations",
  },
  {
    name: "VERY_HIGH",
    level: 3,
    user: "DEPT_HEAD",
    description: "Record Acknowledgement",
  },
  {
    name: "ULTRA_HIGH",
    level: 4,
    user: "DIRECTOR",
    description: "Record Approval",
  },
  {
    name: "UNLIMITED",
    level: 5,
    user: "CHAIRMAN",
    description: "Unlimited Privilege",
  },
];

export const RATING = {
  SUBJECT: ["USER", "JOB", "PROJECT", "EVENT"],
};

export const DATABASE = {
  ERP_VERSION: 3,
  OBJECT_ID_REGEX: /^[0-9a-fA-F]{24}$/,
  RECORD_STATUS: {
    PENDING: "PENDING",
    REJECTED: "REJECTED",
    ACKNOWLEDGED: "ACKNOWLEDGED",
    APPROVED: "APPROVED",
    AUTHORIZED: "AUTHORIZED",
    AUDITED: "AUDITED",
    CLOSED: "CLOSED",
  },
  OPTIONS: {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    autoIndex: true,
    minimize: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      // eslint-disable-next-line object-shorthand
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
    },
  },
};

export const USER_TYPE = {
  USER: "U",
  ADMIN: "A",
  MENTOR: "D",
  MENTEE: "E",
};

export const USER_ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  PARTNER: "PARTNER",
  USER: "USER",
  SUPPLIER: "SUPPLIER",
  OTHERS: "OTHERS",
};

export const EMAIL = {
  CONTACT: "contact@ensemble.com",
  SUPPORT: "support@ensemble.com",
  ADMIN: "admin@ensemble.com",
  NO_REPLY: "no-reply@ensemble.com",
};

export const PAYSTACK = {
  LIVE_URL: "https://api.paystack.co",
  TEST_URL: "https://ravesandboxapi.flutterwave.com",
  PAY: "/flwv3-pug/getpaidx/api/v2/hosted/pay",
  VERIFY: "/transaction/verify/reference",
  REDIRECT_URL: "https://pmtonline.herokuapp.com/verify",
  TRANSACTION: "/v2/gpx/transactions",
  TRANSACTION_EVENTS: "/v2/gpx/transactionmeta/events",
  SETTLEMENT: "/v2/merchant/settlements",
  BVN: "/v2/kyc/bvn",
};

export const TRANSPORT_DOC = {
  LOGO: "LOGO",
  DOCUMENT: "DOCUMENT",
  OTHERS: "OTHERS",
  INSURANCE: "INSURANCE",
  INSURANCE_PLACE: "INSURANCE_PLACE",
  PERMIT: "PERMIT",
  OWNERSHipv4: "OWNERSHIP",
  VEHICLE: "VEHICLE",
};

export const INPUT_TYPE = {
  TEXT: "TEXT",
  TEXTAREA: "TEXTAREA",
  DROPDOWN: "DROPDOWN",
  FILE: "FILE",
  DATETIME: "DATETIME",
  LOCATION: "LOCATION",
  SELECTLIST: "SELECTLIST",
  RADIOBUTTON: "RADIOBUTTON",
  CHECKBOXES: "CHECKBOXES",
  DATE: "DATE",
  TIME: "TIME",
  NUMBER: "NUMBER",
};

export const ISSUE_PRIORITY = {
  EMERGENCY: "P1",
  HIGH: "P2",
  NORMAL: "P3",
  LOW: "P4",
};

export const DEFAULT_VALUE = {
  FUEL_COST: 150,
};

export * from "./status-message";
