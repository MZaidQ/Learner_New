import React, { useState } from 'react'
import Link from 'next/link';
import { Image, Spinner, Button } from 'react-bootstrap';
import Classes from "/styles/TopColleges.module.css";
// import Classes from "/styles/collegeNewCards.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Rating from './Rating';

const collegeNewCard = ({ college }) => {
    const [loadingColleges, setLoadingColleges] = useState([]);
    const { square_img_path, name, ratings, short_address, slug } = college;
    const handleCollegeClick = (collegeId) => {
        setLoadingColleges((prevLoadingColleges) => [...prevLoadingColleges, collegeId]);
    };
    return (
        <div className={Classes.productList}>
            <div key={slug} className={Classes.productCard}>
                <div className='col-md-2'>
                    <img src={square_img_path} alt='product-img' className={Classes.productImage}></img>
                </div>
                <div className='productCard__content col-md-8'>
                    <h3 className={Classes.productName}>{name}</h3>
                    <h2 className='heading'><span className={Classes.productRating}>
                        <Rating stars={Array(5).fill(Math.floor(ratings))} />
                        <div className={Classes.ratingCount}>({Math.floor(ratings)})</div>
                    </span>
                    </h2>       
                    <div className={Classes.displayStack__1}>
                        <div className={Classes.productSales}>Address: {short_address}</div>
                        <div className={Classes.productTime}>Approved by: { }</div>
                    </div>
                </div>
                <div className="col-md-2">
                    <Link href={`/colleges/${slug}`}>
                        {loadingColleges.includes(slug) ? (
                            <Button variant="danger">Loading...</Button>
                        ) : (
                            <Button
                                className={Classes.linkButton}
                                onClick={() => handleCollegeClick(slug)}
                            >
                                <span style={{ marginRight: "1px" }}></span> View                          
                            </Button>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default collegeNewCard