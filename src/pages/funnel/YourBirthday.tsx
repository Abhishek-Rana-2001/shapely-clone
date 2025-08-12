import DatePicker from "react-datepicker"
import { localStrings } from "../../utils/Constants"
import ButtonComponent from "../../components/Button";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFunnel } from "../../context/FunnelContext";

const YourBirthday = () => {
    const navigate = useNavigate()
    const { insurancePlan, handleProgressBar, birthDate, setBirthDate, isUnder18 } = useFunnel()

    return (
        <div className="you-birthday h-[60vh] flex flex-col justify-center">
            <h1 className="!text-[28px] lg:!text-[52px] !text-[#231F20] !font-semibold !mt-8 !mb-2">
                {localStrings.YOUR_BIRTHDAY}
            </h1>
            <p className="text-[14px] lg:text-[22px] w-full lg:w-[70%] mx-auto !text-[#231F20] !mb-8">{insurancePlan === "self-pay" || insurancePlan === "other" ? localStrings.EIGHTEEN_OLDER : localStrings.WE_NEED_THIS_INFO}</p>
            <DatePicker
                className="date-picker-birthday min-w-full lg:min-w-[50%]"
                selected={birthDate}
                onChange={(date: any) => {
                    setBirthDate(date)
                }}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()}
            />
            <ButtonComponent
                buttonText={localStrings.CONTINUE}
                handleButtonClick={() => {
                    if (isUnder18()) {
                        navigate("/funnel/thank-you")
                        return;
                    }
                    handleProgressBar();
                    navigate("/funnel/insurance-details")
                }}
                className="border-0 left-[50%] -translate-x-[50%] lg:left-[40%] absolute bottom-[45px] lg:bottom-[20px] !mt-10" />
            <p className="text-xs sm:text-sm  !text-[#231F20] absolute bottom-0 w-max left-[50%] -translate-x-[50%] flex gap-2 items-center text-left">
                <IoIosLock />
                {localStrings.ALL_INFO_SECURE}
            </p>
        </div>
    )
}

export default YourBirthday