import { prisma } from "../config/prisma.config";
import moment from 'moment';

export const orderLabelArr = {
    totalorders: 'Total Orders',
    orderpending: 'Order Pending',
    orderprocessing: 'Order Processing',
    totaldelivered: 'Total Delivered',
    pickeduporders: 'Picked Up Orders',
    cancelledorders: 'Cancelled Orders',
    outofdelivery: 'Out Of Delivery',
    paidorders: 'Paid Orders',
    unpaidorders: 'Unpaid Orders',
    todaysearnings: "Today's Earnings",
    todayspendingearnings: "Today's Pending Earnings",
    thisyearearning: 'This Year Earning',
    totalearnings: 'Total Earnings',
    totalproductsale: 'Total Product Sale',
    todaysproductsale: "Today's Product Sale",
    thismonthsproductsale: "This Month's Product Sale",
    thisyearsproductsale: "This Year's Product Sale",
    totalcustomers: 'Total Customers',
    totalsubscribers: 'Total Subscribers',
    totalcategories: 'Total Categories'
}


export const getTotalOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count();
        resolve({
            label: orderLabelArr.totalorders,
            count: count.toString()
        });
    })
}

export const getPendingOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                orderStatus: 'PENDING',
            },
        });
        resolve({
            label: orderLabelArr.orderpending,
            count: count.toString()
        });
    })
}

export const getConfirmOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                orderStatus: 'CONFIRMED',
            },
        });
        resolve({
            label: orderLabelArr.orderprocessing,
            count: count.toString()
        });
    })
}

export const getDeliveredOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                orderStatus: 'DELIVERED',
            },
        });
        resolve({
            label: orderLabelArr.totaldelivered,
            count: count.toString()
        });
    })
}

export const getPickupOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                orderType: 'Takeaway',
            },
        });
        resolve({
            label: orderLabelArr.pickeduporders,
            count: count.toString()
        });
    })
}

export const getCancelOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                orderStatus: 'CANCELLED',
            },
        });
        resolve({
            label: orderLabelArr.cancelledorders,
            count: count.toString()
        });
    })
}

export const getOutofdeliveryOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                orderStatus: 'OUTFORDELIVERY',
            },
        });
        resolve({
            label: orderLabelArr.outofdelivery,
            count: count.toString()
        });
    })
}

export const getPaidOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                paymentStatus: 'Success',
            },
        });
        resolve({
            label: orderLabelArr.paidorders,
            count: count.toString()
        });
    })
}

export const getUnpaidOrders = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.order.count({
            where: {
                paymentStatus: 'Pending',
            },
        });
        resolve({
            label: orderLabelArr.unpaidorders,
            count: count.toString()
        });
    })
}

export const getTodayTotalEarningOrders = () => {
    return new Promise(async (resolve) => {
        let todayDate = moment().clone().startOf('day');
        let totalEarnAmount = await prisma.order.aggregate({
            where: {
                orderTime: {
                    gte: todayDate.toDate(),
                },
                paymentStatus: "Success"
            },
            _sum: {
                orderAmount: true,
            },
        });
        let { orderAmount } = totalEarnAmount._sum;
        if (orderAmount) {
            resolve({
                label: orderLabelArr.todaysearnings,
                count: `₹${orderAmount}`
            });
        } else {
            resolve({
                label: orderLabelArr.todaysearnings,
                count: `₹0`
            });
        }
    })
}

export const getTodayPendingEarningOrders = () => {
    return new Promise(async (resolve) => {
        let todayDate = moment().clone().startOf('day');
        let totalEarnAmount = await prisma.order.aggregate({
            where: {
                orderTime: {
                    gte: todayDate.toDate(),
                },
                paymentStatus: "Pending"
            },
            _sum: {
                orderAmount: true,
            },
        });
        let { orderAmount } = totalEarnAmount._sum;
        if (orderAmount) {
            resolve({
                label: orderLabelArr.todayspendingearnings,
                count: `₹${orderAmount}`
            });
        } else {
            resolve({
                label: orderLabelArr.todayspendingearnings,
                count: `₹0`
            });
        }
    })
}

export const getThisYearEarningOrders = () => {
    return new Promise(async (resolve) => {
        let startDateOfYear = moment().startOf('year').toDate();
        let totalEarnAmount = await prisma.order.aggregate({
            where: {
                orderTime: {
                    gte: startDateOfYear,
                },
                paymentStatus: "Success"
            },
            _sum: {
                orderAmount: true,
            },
        });
        let { orderAmount } = totalEarnAmount._sum;
        if (orderAmount) {
            resolve({
                label: orderLabelArr.thisyearearning,
                count: `₹${orderAmount}`
            });
        } else {
            resolve({
                label: orderLabelArr.thisyearearning,
                count: `₹0`
            });
        }
    })
}

export const getTotalEarningOrders = () => {
    return new Promise(async (resolve) => {
        let totalEarnAmount = await prisma.order.aggregate({
            where: {
                paymentStatus: "Success"
            },
            _sum: {
                orderAmount: true,
            },
        });
        let { orderAmount } = totalEarnAmount._sum;
        resolve({
            label: orderLabelArr.totalearnings,
            count: `₹${orderAmount}`
        });
    })
}

export const getTotalProductSale = () => {
    return new Promise(async (resolve) => {
        let totalProductCount = await prisma.order.findMany({
            include: {
                addToCart: true
            }
        });
        let sum = 0;
        for (let i = 0; i < totalProductCount.length; i++) {
            let count = totalProductCount[i] && totalProductCount[i]?.addToCart.length
            sum += count
        }
        resolve({
            label: orderLabelArr.totalproductsale,
            count: sum.toString()
        });
    })
}

export const getTodayProductSale = () => {
    return new Promise(async (resolve) => {
        let todayDate = moment().clone().startOf('day');
        let totalProductCount = await prisma.order.findMany({
            where: {
                orderTime: {
                    gte: todayDate.toDate(),
                },
            },
            include: {
                addToCart: true
            }
        });
        let sum = 0;
        for (let i = 0; i < totalProductCount.length; i++) {
            let count = totalProductCount[i] && totalProductCount[i]?.addToCart.length
            sum += count
        }
        resolve({
            label: orderLabelArr.todaysproductsale,
            count: sum.toString()
        });
    })
}

export const getThisMonthProductSale = () => {
    return new Promise(async (resolve) => {
        let todayDate = moment().clone().startOf('month');
        let totalProductCount = await prisma.order.findMany({
            where: {
                orderTime: {
                    gte: todayDate.toDate(),
                },
            },
            include: {
                addToCart: true
            }
        });
        let sum = 0;
        for (let i = 0; i < totalProductCount.length; i++) {
            let count = totalProductCount[i] && totalProductCount[i]?.addToCart.length
            sum += count
        }
        resolve({
            label: orderLabelArr.thismonthsproductsale,
            count: sum.toString()
        });
    })
}

export const getThisYearProductSale = () => {
    return new Promise(async (resolve) => {
        let todayDate = moment().clone().startOf('year');
        let totalProductCount = await prisma.order.findMany({
            where: {
                orderTime: {
                    gte: todayDate.toDate(),
                },
            },
            include: {
                addToCart: true
            }
        });
        let sum = 0;
        for (let i = 0; i < totalProductCount.length; i++) {
            let count = totalProductCount[i] && totalProductCount[i]?.addToCart.length
            sum += count
        }
        resolve({
            label: orderLabelArr.thisyearsproductsale,
            count: sum.toString()
        });
    })
}

export const getCustomers = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.user.count({
            where: {
                "isActive": true
            }
        });
        resolve({
            label: orderLabelArr.totalcustomers,
            count: count.toString()
        });
    })
}

export const getTotalSubscribe = () => {
    return new Promise(async (resolve) => {
        // let count = await prisma.user.count({
        //     where: {
        //         "isActive": true
        //     }
        // });
        resolve({
            label: orderLabelArr.totalsubscribers,
            count: 0
        });
    })
}

export const getCategory = () => {
    return new Promise(async (resolve) => {
        let count = await prisma.productCategory.count();
        resolve({
            label: orderLabelArr.totalcategories,
            count: count.toString()
        });
    })
}

export const allOrdersFunctions = [
    getTotalOrders,
    getPendingOrders,
    getConfirmOrders,
    getDeliveredOrders,
    getPickupOrders,
    getCancelOrders,
    getOutofdeliveryOrders,
    getPaidOrders,
    getUnpaidOrders,
    getTodayTotalEarningOrders,
    getTodayPendingEarningOrders,
    getThisYearEarningOrders,
    getTotalEarningOrders,
    getTotalProductSale,
    getTodayProductSale,
    getThisMonthProductSale,
    getThisYearProductSale,
    getCustomers,
    getTotalSubscribe,
    getCategory
];