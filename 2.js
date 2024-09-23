const voucher = {
  dumbWaysJos : {
    name : "DumbWaysJos",
    minBuy : 50000,
    maxDiscount : 20000,
    discountPercentage : 21.1
  },
  dumbWaysMantap : {
    name : "DumbWaysMantap",
    minBuy : 80000,
    maxDiscount : 40000,
    discountPercentage: 30
  }
}

function formatIDR(amount) {
  return 'Rp.' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

const voucherCounter = (voucher, nominal) => {
  if(nominal < voucher.minBuy) return console.log( `Minimum nominal is ${formatIDR(Math.round(voucher.minBuy))} to use this Voucer!`)
  
  let discount = voucher.discountPercentage / 100 * nominal
  let pay = nominal - discount

  if(discount > voucher.maxDiscount) {
    discount = voucher.maxDiscount
    pay = nominal - discount
  }

  console.log(`Successfully Used ${voucher.name} Voucher!`)
  console.log(`---------------------------------`)
  console.log(`Total Discount`, `-${formatIDR(Math.round(discount))}`)
  console.log(`---------------------------------`)
  console.log('Payment', formatIDR(Math.round(nominal)))
  console.log(`Total Bill`, formatIDR(Math.round(pay)))

}


// voucherCounter(voucher.dumbWaysJos, 100000)