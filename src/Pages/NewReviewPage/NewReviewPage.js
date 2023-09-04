import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./NewReviewPage.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../../Components/Header/Header";
import { average } from "../../Lib/average";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";

function NewReviewPage() {
  const [condition, setCondition] = useState("");
  const [confort, setConfort] = useState("");
  const [safety, setSafety] = useState("");
  const [management, setManagement] = useState("");
  const [comments, setComments] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [picture, setPicture] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { propertyId } = useParams();

  const [conditionError, setConditionError] = useState(false);
  const [confortError, setConfortError] = useState(false);
  const [safetyError, setSafetyError] = useState(false);
  const [managementError, setManagementError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [pictureError, setPictureError] = useState(false);

  const [success, setSuccess] = useState(false);

  //authentication to use firebase to upload a file to the cloud storage
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };

  // //implementing functionality for uploading the image
  // const app = initializeApp(firebaseConfig);
  // const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);
  // const uploadImage = async (imageFile) => {
  //   const storageRef = ref(storage, `${imageFile[0].name}`);

  //   try {
  //     await uploadBytes(storageRef, imageFile[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   const url = await getDownloadURL(ref(storage, storageRef.fullPath));
  //   setImageUrl(url);
  // };

  //this is the url of the uploaded image that will be used in the axios request
  // console.log(imageUrl);
  //uploadImage(picture);

  const handleAddCondition = (event) => {
    setCondition(event.target.value);
    // console.log(setCondition);
    setConditionError(false);
  };
  const handleAddConfort = (event) => {
    setConfort(event.target.value);
    // console.log(setConfort);
  };
  const handleAddSafety = (event) => {
    setSafety(event.target.value);
    // console.log(setSafety);
  };
  const handleAddManagement = (event) => {
    setManagement(event.target.value);
    // console.log(setManagement);
  };
  const handleAddComments = (event) => {
    setComments(event.target.value);
    // console.log(setComments);
  };
  const handleAddPrice = (event) => {
    setPrice(event.target.value);
    // console.log(setPrice);
  };
  const handleAddDate = (event) => {
    setDate(event.target.value);
    // console.log(setDate);
  };
  const handleAddPicture = (event) => {
    setPicture(event.target.files);
    // we add the uploaded picture
  };
  //console.log(picture);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    //Average rating of the review calculation
    const ratingArray = [
      Number(condition),
      Number(confort),
      Number(safety),
      Number(management),
    ];

    //showing rating with stars (only read)
    console.log(ratingArray);
    // function average(array) {
    //   let sum = 0;
    //   for (let i = 0; i < ratingArray.length; i++) {
    //     sum += ratingArray[i];
    //   }
    //   return (sum / ratingArray.length).toFixed(2);
    // }
    const averageRating = average(ratingArray);
    // console.log(averageRating);
    // console.log(typeof averageRating);

    //Form validation

    if (condition === "") {
      console.log(condition);
      setConditionError(true);
    }
    if (confort === "") {
      console.log(confort);
      setConfortError(true);
    }
    if (safety === "") {
      console.log(safety);
      setSafetyError(true);
    }
    if (management === "") {
      console.log(management);
      setManagementError(true);
    }
    if (comments === "") {
      console.log(comments);
      setCommentsError(true);
    }
    if (price === "") {
      console.log(price);
      setPriceError(true);
    }
    if (date === "") {
      console.log(date);
      setDateError(true);
    }
    // if (picture === "") {
    //   console.log(picture);
    //   setPictureError(true);
    // }

    // if (!imageUrl || picture.length === 0) {
    //   setPictureError(true);
    //   return;
    // }
    if (
      conditionError ||
      confortError ||
      safetyError ||
      managementError ||
      commentsError ||
      priceError ||
      dateError ||
      pictureError
    ) {
      return <p className="error-message">Please fill al the fields.</p>;
    }
    // Check if a picture has been selected

    console.log(
      "input values",
      condition,
      confort,
      safety,
      management,
      comments,
      price,
      date,
      imageUrl,
      averageRating
    );
    //we call the function to upload the image within the scope of the handleReviewSubmit function, before the axios request
    // uploadImage(picture);

    try {
      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);
      console.log("imageFile:", `${picture[0].name}`);
      const storageRef = ref(storage, `jara${picture[0].name}`);
      console.log(storageRef);
      await uploadBytes(storageRef, picture[0]);
      const imageUrl = await getDownloadURL(ref(storage, storageRef.fullPath));
      setImageUrl(imageUrl);
      console.log(imageUrl);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reviews/${propertyId}/review`,
        {
          condition: condition,
          confort: confort,
          safety: safety,
          management: management,
          comments: comments,
          price: price,
          date: date,
          picture: imageUrl,
          rating: averageRating,
        }
      );

      console.log("Review added successfully", response.data);
      setCondition("");
      setConfort("");
      setSafety("");
      setManagement("");
      setComments("");
      setPrice("");
      setDate("");
      setPicture("");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      console.error(`Error adding the review`);
    }
  };

  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/reviews/${propertyId}/review`, {
  //       condition: condition,
  //       confort: confort,
  //       safety: safety,
  //       management: management,
  //       comments: comments,
  //       price: price,
  //       date: date,
  //       picture: imageUrl, //here we send the url of the uploaded image
  //       rating: averageRating,
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.error(`Error adding review to property with id ${propertyId}`);
  //     });
  //   setCondition("");
  //   setConfort("");
  //   setSafety("");
  //   setManagement("");
  //   setComments("");
  //   setPrice("");
  //   setDate("");
  //   setPicture("");
  // };
  //this to test only the upload fiile function, to be removed
  // const handleDummySubmit = (e) => {
  //   e.preventDefault();
  //   uploadImage(picture);
  // };
  return (
    <>
      <Header />
      <div className="review__title-container">
        <h2 className="review__title">Add your Review</h2>
      </div>

      <form className="review-form" onSubmit={handleReviewSubmit}>
        <label htmlFor="condition" className="review-form__label">
          Rate the overall condition of the property and furniture
        </label>

        <select
          name="condition"
          id="condition"
          className={`review-form__input ${
            conditionError ? "review-form__input--error" : ""
          }`}
          value={condition}
          onChange={handleAddCondition}
        >
          <option value="none" className="review-form__option">
            Select a Value
          </option>
          <option value="1" className="review-form__option">
            1
          </option>
          <option value="2" className="review-form__option">
            2
          </option>
          <option value="3" className="review-form__option">
            3
          </option>
          <option value="4" className="review-form__option">
            4
          </option>
          <option value="5" className="review-form__option">
            5
          </option>
        </select>
        {conditionError && (
          <p className="error-message">Please select a condition rating.</p>
        )}

        <label htmlFor="confort" className="review-form__label">
          Rate the overall confort (thermal, sound insulation, etc.)
        </label>
        <select
          name="confort"
          id="confort"
          className={`review-form__input ${
            confortError ? "review-form__input--error" : ""
          }`}
          placeholder="Choose a value from 1 to 5"
          value={confort}
          onChange={handleAddConfort}
        >
          <option value="none" className="review-form_option">
            Select a Value
          </option>
          <option value="1" className="review-form_option">
            1
          </option>
          <option value="2" className="review-form_option">
            2
          </option>
          <option value="3" className="review-form_option">
            3
          </option>
          <option value="4" className="review-form_option">
            4
          </option>
          <option value="5" className="review-form_option">
            5
          </option>
        </select>
        {confortError && (
          <p className="error-message">Please select a confort rating.</p>
        )}
        <label htmlFor="safety" className="review-form__label">
          Rate how you perceived the safety of the area
        </label>
        <select
          name="safety"
          id="safety"
          className={`review-form__input ${
            safetyError ? "review-form__input--error" : ""
          }`}
          value={safety}
          onChange={handleAddSafety}
        >
          <option value="none" className="review-form_option">
            Select a Value
          </option>
          <option value="1" className="review-form_option">
            1
          </option>
          <option value="2" className="review-form_option">
            2
          </option>
          <option value="3" className="review-form_option">
            3
          </option>
          <option value="4" className="review-form_option">
            4
          </option>
          <option value="5" className="review-form_option">
            5
          </option>
        </select>
        {safetyError && (
          <p className="error-message">Please select a safety rating.</p>
        )}
        <label htmlFor="management" className="review-form__label">
          Rate the property management by the landlord and/or letting agent:
        </label>
        <select
          name="management"
          id="management"
          className={`review-form__input ${
            managementError ? "review-form__input--error" : ""
          }`}
          value={management}
          onChange={handleAddManagement}
        >
          <option value="none" className="review-form_option">
            Select a Value
          </option>
          <option value="1" className="review-form_option">
            1
          </option>
          <option value="2" className="review-form_option">
            2
          </option>
          <option value="3" className="review-form_option">
            3
          </option>
          <option value="4" className="review-form_option">
            4
          </option>
          <option value="5" className="review-form_option">
            5
          </option>
        </select>
        {managementError && (
          <p className="error-message">Please select a management rating.</p>
        )}

        <label htmlFor="comments" className="review-form__label">
          Tell us your experience
        </label>
        <input
          type="text"
          name="comments"
          placeholder="Add your opinion about the experience renting this property"
          className={`review-form__input ${
            commentsError ? "review-form__input--error" : null
          }`}
          value={comments}
          onChange={handleAddComments}
        />
        {commentsError && (
          <p className="error-message">Please add your comments.</p>
        )}

        <label htmlFor="price" className="review-form__label">
          Monthly rent (excluding bills)
        </label>

        <input
          type="number"
          name="price"
          placeholder="Add the monthly rent in GBP"
          className={`review-form__input ${
            priceError ? "review-form__input--error" : ""
          }`}
          value={price}
          onChange={handleAddPrice}
        />
        {priceError && <p className="error-message">Please share the rent.</p>}

        <label htmlFor="date" className="review-form__label">
          Last year living in this property
        </label>
        <input
          type="number"
          name="date"
          placeholder="Add year in YYYY format"
          className={`review-form__input ${
            dateError ? "review-form__input--error" : null
          }`}
          value={date}
          onChange={handleAddDate}
        />
        {dateError && <p className="error-message">Please add the date.</p>}

        <label htmlFor="picture" className="review-form__label-file">
          Upload your pictures
          <div className="review-form__label-icon">
            <PhotoCameraFrontOutlinedIcon fontSize="inherit" />
          </div>
        </label>
        <input
          type="file"
          name="picture"
          id="picture"
          accept="image/png, image/jpeg"
          onChange={handleAddPicture}
          className={`review-form__input-file ${
            pictureError ? "review-form__input--error" : ""
          }`}
        />
        {pictureError && (
          <p className="error-message">Please upload a picture.</p>
        )}

        <button className="review-form__button">Add Review</button>
      </form>

      {success && (
        <div className="review-form__success-message">
          Your review has been successfully added!
          <Link to={`/properties/${propertyId}`} className="review-form__link">
            View Review
          </Link>
        </div>
      )}
    </>
  );
}
export default NewReviewPage;
