import React from 'react'
import { Accessibility, LockIcon, CurrencyIcon } from 'lucide-react'
const Offer = () => {
    return (
        <main className='sm:flex-row flex flex-col  sm:gap-0 gap-8 justify-between w-full mt-14 p-8 max-w-full overflow-x-hidden'>
            <div className="flex flex-col items-center gap-4 sm:mb-0 mb-4">
                <Accessibility />
                <p className="text-center whitespace-nowrap">
                    <span className="block ">Once enrolled, you gain lifetime access to</span>
                    <span className="block "> our courses and any future updates—learn</span>
                    <span className="block ">at your own pace.</span>
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:mb-0 mb-4">
                <LockIcon />
                <p className="text-center whitespace-nowrap">
                    <span className="block ">Enjoy peace of mind with our security protocols</span>
                    <span className="block ">and secure payment gateway integration</span>
                    <span className="block ">with Paystack.</span>
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:mb-0 mb-4">
                <CurrencyIcon />
                <p className="text-center whitespace-nowrap">
                    <span className="block">If you’re not satisfied within 24 hours,</span>
                    <span className="block">we offer a hassle-free refund—</span>
                    <span className="block">no questions asked.</span>
                </p>
            </div>

        </main>
    )
}

export default Offer
