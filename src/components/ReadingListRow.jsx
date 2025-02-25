import { Link } from "react-router-dom";
import "./ReadingListRow.css";
import IconButton from "./IconButton";
import check from "../assets/check.svg";
import pencil from "../assets/pencil.svg";
import listWithCross from "../assets/listWithCross.svg";
import {
  markAsRead,
  removeFromReading,
} from "../helperFunctions/updateUserLists";
import {
  getBooksReadingDetails,
  getBooksReadDetails,
} from "../helperFunctions/getDataFromDB";

function ReadingListRow({ book, setBooksReadingDetails, setBooksReadDetails }) {
  return (
    <li className="ReadingListRow" key={book.id}>
      {book.image ? (
        <img
          className="ReadingListRow-cover"
          src={book.image}
          alt={`${book.title} cover`}
        />
      ) : (
        <div className="ReadingListRow-no-cover">Cover not available</div>
      )}
      <div className="ReadingListRow-Details">
        <Link to={`/book/${book.id}/isReading`}>
          <strong className="textSmall">{book.title}</strong>
        </Link>
        <p>{book.author}</p>
        <p>
          {book.current_page}/{book.pages}pages
        </p>
      </div>
      <div className="UserBooks-icon-buttons">
        <IconButton
          buttonImg={check}
          label="Mark as read"
          bookId={book.id}
          addToList={markAsRead}
          getUpdatedNewList={getBooksReadDetails}
          updateNewListComponent={setBooksReadDetails}
          removeFromList={removeFromReading}
          getUpdatedOldList={getBooksReadingDetails}
          updateOldListComponent={setBooksReadingDetails}
        />
        <div className="IconButton">
          <div className="AllBooksListRow-icon-wrapper">
            <Link to={`/book/${book.id}/isReading`}>
              <img src={pencil} />
            </Link>
          </div>

          <p className="AllBooksListRow-label">Update page</p>
        </div>
        <IconButton
          buttonImg={listWithCross}
          label="Remove"
          bookId={book.id}
          addToList={null}
          getUpdatedNewList={null}
          updateNewListComponent={null}
          removeFromList={removeFromReading}
          getUpdatedOldList={getBooksReadingDetails}
          updateOldListComponent={setBooksReadingDetails}
        />
      </div>
    </li>
  );
}
export default ReadingListRow;
