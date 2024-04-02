import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Style from "../styles/AppliedFilterList.module.css"
 
const Chip = ({ label, onDelete, hide }) => {
    return (
        <div 
               className={`d-flex flex-wrap justify-content-center gap-1 border py-1 px-2 chip-container ${Style.main}`}

            >
            <div>{label}</div>
            {hide && <div className='cursor-pointer text-gray-600' onClick={onDelete}><CloseRoundedIcon style={{ fontSize: '18px', cursor: 'pointer' }} /></div>}
        </div>
    )
}

const CourseChip = ({ item, onChangeCourses }) => {
    return <Chip className={Style.C_chip} label={item} onDelete={() => onChangeCourses(item, false)} hide={false}/>
}
const ZoneChip = ({ item, onChangeZone }) => {
    return <Chip className={Style.Z_chip} label={item} onDelete={() => onChangeZone(item, false)} hide={true}     
/>
}
const RatingChip = ({ item, onChangeRating }) => {
    return <Chip className={Style.R_chip} label={`Rating ${item}`} onDelete={() => onChangeRating(item, false)} hide={true}  
                />
}
const FeeChip = ({ item, onChangeFee }) => {
    return <Chip className={Style.F_chip} label={`Fees ${item}`} onDelete={() => onChangeFee(item, '', false)} hide={true}     
             />
}


const AppliedFilterList = ({ course, zone, rating, fee, onChangeZone, onChangeRating, onChangeFee }) => {
    return (
        <div className='d-flex align-items-center py-2 gap-3'>
            <div className={Style.Applied_Filter}>Applied Filter:</div>
            {course && <CourseChip
                item={course}
            />}
            {zone && <ZoneChip
                item={zone}
                onChangeZone={onChangeZone}
            />}
            {rating && <RatingChip
                item={rating}
                onChangeRating={onChangeRating}
            />}
            {fee && <FeeChip
            
                item={fee}
                onChangeFee={onChangeFee}
            />}
        </div>
    )
}

export default AppliedFilterList
