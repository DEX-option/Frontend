import * as types from '../types'

type schemes = {
    algorithm: types.infoContent,
    howToEarn: types.infoContent,
    roadMap: types.infoContent
}

export const siteSchemes : schemes = {
    algorithm: {
        title: "How it works?",
        description: "",
        timeline: true,
        content: [{
            heading: "You sanding a liquid token you owned",
            description: "It's may be WETH, BNB, WBTC or anything of top crypto, it's price is now fixing",
            image: "img/steps/step0.png",
            imagePosition: 'left'
           }, {
            heading: "In exchange you receiving an option token with a limited lifetime",
            description: "While it's not expired your option may be sold or bought by anyone the same as any another token",
            image: "img/steps/step1.png",
            imagePosition: "left"
           }, {
            heading: "Option can be executed",
            description: "While token is not expired, it's owner can receive a base asset. For this he must send a token and it's price to contract",
            image: "img/steps/step2.png",
            imagePosition: "left"
           }, {
            heading: "When your option has expired",
            description: "You can withdraw it's price if option was executed or your asset itself if not",
            image: "img/steps/step3.png",
            imagePosition: "left"
           }, {
            heading: "Call or put option",
            description: "You can make it's all on your choise. In second case you'll need to send an asset's cost",
            image: "img/steps/step4.png",
            imagePosition: "left"
           }]
    },
    howToEarn: {
        title: "How to get profit?",
        description: "Ways to earn money through option trading",
        timeline: true,
        content: [{
            heading: "Sell option for money",
            description: "After you have made an option you can sell it for up to 10% of it's price and it's all is yours!",
            image: "img/steps/step5.png",
            imagePosition: "left"
        }, {
            heading: "Make money on price changing",
            description: "You can buy option for the 10% of base price and convert 50% price growth to 1000% profit!",
            image: "img/steps/step6.png",
            imagePosition: "left"
        }, {
            heading: "Buy cheaper, sell more expensive",
            description: "Option gives you a right to buy assets on fixed price",
            image: "img/steps/step9.png",
            imagePosition: "left"
        }, {
            heading: "Staking PIEX",
            description: "Part of the our token is dividing between token crators (Providers of the basic assets)",
            image: "img/steps/step7.png",
            imagePosition: "left"
        }, {
           heading: "Receive a dividends",
           description: "Our income sourse is a comission on withdraw and option executing operations. 50% of this will taken by PIEX token holders",
           image: "img/steps/step8.png",
           imagePosition: "left" 
        }]
    },
    roadMap: {
        title: "Plan of starting a project",
        description: "",
        timeline: true,
        content: [{
           heading: "2023 Q2: Option creation available",
           description: "Basic working version of the our creating blockchain platform",
           image: "",
           imagePosition: "left" 
        }, {
            heading: "2023 Q3: Option p2p exchanging garant",
            description: "Additional smart contract for the safe option buy and sell through p2p",
            image: "",
            imagePosition: "left" 
         }, {
            heading: "2023 Q4: Local dex with option token support",
            description: "DEX with completely service for option trading. Available with online price updating",
            image: "",
            imagePosition: "left" 
         }]
    },
}