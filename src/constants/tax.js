/*
Annual income (NGN) 	PIT rate (%)
First 300,000 	            7
Next 300,000 	            11
Next 500,000 	            15
Next 500,000 	            19
Next 1,600,000 	            21
Over 3,200,000 	            24
*/

const TAX = [
    { step: 0, amount: 300000, pitRate: 7, description: "7% of First N300,000" },
    { step: 1, amount: 300000, pitRate: 11, description: "11% of Next N300,000" },
    { step: 2, amount: 500000, pitRate: 15, description: "15% of Next N500,000" },
    { step: 3, amount: 500000, pitRate: 19, description: "19% of Next N500,000" },
    { step: 4, amount: 1600000, pitRate: 21, description: "21% of Next N1,600,000" },
    { step: 5, amount: 3200000, pitRate: 24, description: "24% of Over N3,200,000" },
];
