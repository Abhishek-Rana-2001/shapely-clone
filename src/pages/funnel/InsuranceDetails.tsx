import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { localStrings } from '../../utils/Constants';
import ButtonComponent from '../../components/Button';
import { IoIosLock } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useFunnel } from '../../context/FunnelContext';

type insuranceType = {
    label:string,
    value:string
}

const InsuranceDetails = () => {
    const [selectedInsurance, setSelectedInsurance] = useState<null | insuranceType>(null)
    const navigate = useNavigate()
    const { handleProgressBar, userDetails,memberId, setMemberId, birthDate  } = useFunnel();
    const insurance = [
        {
            label: "Aetna",
            value: "aetna"
        }
    ]

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setMemberId(e.target.value)
    }


    const handleCheckInsurance = async()=>{
        try {
            const response = await fetch(`https://zoho-solution-887781528.development.catalystserverless.com/server/zohocrm/insurance?insurance=${selectedInsurance?.value}&firstName=${userDetails.first_name}&lastName=${userDetails.last_name}&memberId=${memberId}&dateOfBirth=${birthDate}`, {
                method:"GET",
            })
            if(response.status === 200){
               navigate("/funnel/thank-you")
            }
            handleProgressBar()
        } catch (error) {
             console.log(error)
             navigate("/funnel/check-information");
        }
    }

    return (
        <>
            <div className='flex flex-col items-center flex-1'>
                <h1 className="!text-[28px] lg:!text-[52px] !text-[#231F20] !font-semibold !mt-8 !mb-2 text-center">
                    {localStrings.ADD_YOUR_INSURANCE_DETAILS}
                </h1>
                <p className="text-[14px] lg:text-[22px] w-full lg:w-[80%] mx-auto !text-[#231F20] !mb-5 text-center">{localStrings.SHAPELY_IN_NETWORK_WITH_HEALTH_PLANS}</p>
                <div className='!w-full lg:!w-[40%] mx-auto'>
                    <p className="!!text-sm lg:!text-lg mb-1 text-[#554A4D] text-left">{localStrings.INSURANCE_PLAN_LABEL}</p>
                    <Select
                        value={selectedInsurance}
                        onChange={(e: any) => setSelectedInsurance(e)}
                        options={insurance}
                        className="stateSelect mb-4"
                    />
                    <Form.Group className="mb-3 text-left" controlId={localStrings.MEMBER_ID_KEY}>
                        <Form.Label className="!!text-sm lg:!text-lg !font-normal !text-[#554A4D]" style={{ marginBottom: "5px" }}>{localStrings.MEMBER_ID}</Form.Label>
                        <Form.Control onChange={handleChange} className="!border-2 min-h-[52px] !border-[#F1DEDE]" type={localStrings.TYPE_NUMBER} name={localStrings.MEMBER_ID_KEY} />
                    </Form.Group>
                </div>
            </div>
            <div className=''>
                <div className="flex justify-center">
                    <ButtonComponent
                        buttonText={localStrings.CONTINUE}
                        handleButtonClick={handleCheckInsurance
                        //     () => {
                        //     handleProgressBar();
                        //     navigate("/funnel/check-information")
                        // }
                    }
                        className="!mt-10" />
                </div>
                <p className="text-xs sm:text-sm !text-[#231F20] flex gap-2 items-center max-sm:justify-center mt-3">
                    <IoIosLock />
                    {localStrings.ALL_INFO_SECURE}
                </p>
            </div>
        </>
    )
}

export default InsuranceDetails