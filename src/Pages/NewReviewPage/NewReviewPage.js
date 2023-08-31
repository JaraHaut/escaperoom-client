import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./NewReviewPage.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";

function NewReviewPage() {
  const [condition, setCondition] = useState([]);
  const [confort, setConfort] = useState([]);
  const [safety, setSafety] = useState([]);
  const [management, setManagement] = useState([]);
  const [comments, setComments] = useState("");
  const [price, setPrice] = useState([]);
  const [date, setDate] = useState([]);
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

  //authentication to use firebase to upload a file to the cloud storage
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };

  //implementing functionality for uploading the image
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);
  const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, `${imageFile[0].name}`);

    try {
      await uploadBytes(storageRef, imageFile[0]);
    } catch (error) {
      console.log(error);
    }
    const url = await getDownloadURL(ref(storage, storageRef.fullPath));
    setImageUrl(url);
  };

  //this is the url of the uploaded image that will be used in the axios request
  console.log(imageUrl);
  //uploadImage(picture);

  const handleAddCondition = (event) => {
    setCondition(event.target.value);
    // console.log(setCondition);
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

  const handleReviewSubmit = (event) => {
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
    function average(array) {
      let sum = 0;
      for (let i = 0; i < ratingArray.length; i++) {
        sum += ratingArray[i];
      }
      return (sum / ratingArray.length).toFixed(2);
    }
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
      setTimeout(() => {
        setCommentsError(false);
      }, 2000);
    }
    if (price === "") {
      console.log(price);
      setPriceError(true);
      setTimeout(() => {
        setPriceError(false);
      }, 2000);
    }
    if (date === "") {
      console.log(date);
      setDateError(true);
      setTimeout(() => {
        setDateError(false);
      }, 2000);
    }
    if (picture === "") {
      console.log(picture);
      setPictureError(true);
      setTimeout(() => {
        setPictureError(false);
      }, 2000);
    }

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
      return;
    }
    //we call the function to upload the image within the scope of the handleReviewSubmit function, before the axios request
    uploadImage(picture);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/properties/${propertyId}/review`,
        {
          condition: condition,
          confort: confort,
          safety: safety,
          management: management,
          comments: comments,
          price: price,
          date: date,
          picture: imageUrl, //here we send the url of the uploaded image
          rating: averageRating,
        }
      )
      .catch((error) => {
        console.log(error);
        console.error(`Error adding review to property with id ${propertyId}`);
      });
    setCondition("");
    setConfort("");
    setSafety("");
    setManagement("");
    setComments("");
    setPrice("");
    setDate("");
    setPicture("");
  };
  //this to test only the upload fiile function, to be removed
  const handleDummySubmit = (e) => {
    e.preventDefault();
    uploadImage(picture);
  };
  return (
    <>
      <Header />

      <form className="review-form" onSubmit={handleReviewSubmit}>
        <label htmlFor="condition" className="review-form__label">
          Rate the overall condition of the property and furniture
        </label>
        <select
          name="condition"
          id="condition"
          className="review-form__input"
          value={condition}
          onChange={handleAddCondition}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="confort" className="review-form__label">
          Rate the overall confort (thermal, sound insulation, etc.)
        </label>
        <select
          name="confort"
          id="confort"
          className="review-form__input"
          value={confort}
          onChange={handleAddConfort}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="safety" className="review-form__label">
          Rate how you perceived the safety of the area
        </label>
        <select
          name="safety"
          id="safety"
          className="review-form__input"
          value={safety}
          onChange={handleAddSafety}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="management" className="review-form__label">
          Rate the property management by the landlord and/or letting agent:
        </label>
        <select
          name="management"
          id="management"
          className="review-form__input"
          value={management}
          onChange={handleAddManagement}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="comments" className="review-form__label">
          Tell us your experience
        </label>
        <input
          type="text"
          name="comments"
          placeholder="Add your opinion about the experience renting this property"
          className="review-form__input"
          value={comments}
          onChange={handleAddComments}
        />
        <label htmlFor="price" className="review-form__label">
          Monthly rent (excluding bills):
        </label>
        <input
          type="number"
          name="price"
          placeholder="Add the monthly rent in GBP"
          className="review-form__input"
          value={price}
          onChange={handleAddPrice}
        />
        <label htmlFor="date" className="review-form__label">
          Last year living in this property
        </label>
        <input
          type="number"
          name="date"
          placeholder="Add year in YYYY format"
          className="review-form__input"
          value={date}
          onChange={handleAddDate}
        />
        <label htmlFor="picture" className="review-form__label">
          Upload your pictures
        </label>
        <input
          type="file"
          name="picture"
          id="picture"
          accept="image/png, image/jpeg"
          onChange={handleAddPicture}
          // value={picture}
        />

        <button className="review-form__button">Add Review</button>
      </form>
    </>
  );
}
export default NewReviewPage;
