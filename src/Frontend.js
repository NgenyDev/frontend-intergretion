import React, { useState } from 'react';
import './Frontend.css';
import Navbar from './Navbaruser';
import Sidebar from './Sidebar-adding'; // Import Sidebar
import { FaThumbsUp, FaThumbsDown, FaPlus, FaBookmark as FaBookmarkSolid, FaRegBookmark } from 'react-icons/fa';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({
        content,
        image: '/api/placeholder/600/400',
      });
      setContent('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FrontendFeature = ({ 
  image, 
  content, 
  likes, 
  dislikes, 
  isBookmarked,
  onLike, 
  onDislike, 
  onBookmark,
  comments, 
  onAddComment 
}) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="frontend-feature">
      <div className="feature-image-container">
        <img src={image} alt="Frontend" className="feature-image" />
      </div>
      <div className="frontend-feature-info">
        <div className="feature-text">
          {content}
        </div>
        <div className="frontend-feature-actions">
          <button className="action-btn like-btn" onClick={onLike}>
            <FaThumbsUp size={18} />
            <span>{likes}</span>
          </button>
          <button className="action-btn dislike-btn" onClick={onDislike}>
            <FaThumbsDown size={18} />
            <span>{dislikes}</span>
          </button>
          <button 
            className={`action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`} 
            onClick={onBookmark}
          >
            {isBookmarked ? 
              <FaBookmarkSolid size={18} /> : 
              <FaRegBookmark size={18} />
            }
          </button>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-input">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleCommentSubmit}>Post</button>
        </div>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <img src={comment.avatar} alt="User avatar" className="comment-avatar" />
              <div className="comment-content">
                <span className="comment-username">{comment.username}</span>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FrontendComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: 'data:image/jpeg;base64,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',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 2,
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEhAQEBIVDxAWFxYVFRgVFhUWFRUXFxUXGBkXFhYYHiggGBolGxYaITEhJSotLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGzIlICUtLS0vLS4vLS8tLS8vLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALkBEAMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgj/xABGEAABAwIDAwgFCQUIAwEAAAABAAIDBBEFEiEGMVEHEyJBYXGBkTJSkqHBFCNCYqKxwtHwFRZygtIkM0NTY7Lh4hdUlIT/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADcRAAIBAwAHBQcEAgIDAAAAAAABAgMEEQUSITFRYXEUFSJBoRMyUoGRsdEjweHwM0Ji8SRDU//aAAwDAQACEQMRAD8A7ggKoCy2qjLjGHtMg1LQ4FwGmpbvG8eaAtftOntm56LLe187bXte1777IAzE6d2jZonGxJs9p0AuTv3AIC4yshc0yCRhYN7g5paO917BAeRiEByWljOc2Z029I3tZuuuumiAyUAQFEBVAEAQBAUQGqdtLh4vesphbf8APxafaQFyox+iic5klVBG9vpNdNG1w0vqCbjQoBLj9CzLnqoGZmh7c00YzNJIDm3Orbg6jgUBlUVdDO3PDIyZl7Zo3Ne246rtJF9R5oDIQBAEAQBAEAQBAEBbdMwENLgHHcCRc+HggLfy2H/MZ7TfzQF9pBAI1B3W60BVAEAQBAEBwHEp8Vj2jxQ4TEyap5toe15YAIslPc9NzRfNk6+tAV5KNmKXE8Iqo6kOLY6l8rcrsvSFOwC/EaoCzyZbMUr8IxHEiHfKWxVsQOboZDS7i3+YoCKYXhGLOw57YSf2dOyWql9Vpoy4FruBJDNBv6HqmwGyZVx09PslPK7JFHPPI91icrGV7XONgCTYA6DVAfQezW1FFibXyUUvPsYQ1xySMsSL2s9ovpwQG5QBAEAQBAEAQHy/sm3Z4urP2w57ZefdzeTnvQub/wB2Lb+KApyo81Hi2ISO5iY3ZaOT5RmHzceoLMovb61kB422ER/Y8rjAwDDofmX/ACjKRzs+gLLm2vW++iA67yCztkwxzmxshHyiTosz5fRj16bnG/igOjoAgCAIAgCAIAgMTFcShpIZKid3NwxjM91nOsONmgk+AQHG6naCjxLaXC56STnohCY3OySMs4NqnEWe0Hc4a9qAh1fheC0GItD3x4lhcl7GGYmWC5Hpc24Elvb6Te0ID6UwdsIp6cU5BpxHGIiCSDHkGQgnUjLbVAZiAIAgCAwMYxaKkYJJrhpcG9EE6kE9XcVrqVY01mRvoW868tWG8jcO0uDsmfUsiDah4yvlEAEjm6aOeBcjot0PqjgtHbaXH0JndF1w9UecO2jwamY6OniEEbjdzY4AxriRYkhosdBZO20uPoO6LrgvqilJtBgsMT6eKFsUD82eNkAbG/M3K7MwCxuBY33hO20uPoO6Lrgvqj1BtJg0cJpmRBlOQ4GJsAEZDr5gWAWsbm/G6dtpcfQd03PBfVGJLiOzz2RxvpInRx5ubaaVhazMczsjSLNudTbenbaPH0HdNzwX1RlYZtJg1IHNpohTNcbuEUAYCQN5DQLmydtpcfQd0XPBfVE0a64BUsrCqAIAgCA020e0lPh4jdOHkPJDcjQ7UAHXUcVKtrSpcNqHka6lSMN5o/8Aydh3Cb2B/Upfc1zy+pr7VA1p2vwA76MH/wDNEnc1zy+o7VA8VW1Wz0z3SS0TZZHauc+lhc5xsBq46nQAeCdzXPL6jtVMTbU7PPDA+ha8MaGMzUsJyMBJDG39FoJOg01KdzXPL6nnaqZmUG32D07ebggfAy5OWOFjG3O82aQL6DXsTua55fUdqpmZDylYe9zWATZnODR0BvcbD6XEryWiLiMXJ42cz1XMCZKrJAQBAEAQFmrqWRNL3mzRv0J3m24d611akacXKW5GUIub1VvNf+8dJ659h/5KH3pbfF6M39kq8PVFitxegnY6Ka0sThZzXRuLXDgQRqnelt8Xox2Srw9Uaqho8Bp3tlhpoYpW3yuZBlcLgg2IbpoSPFO9Lb4vRjslXh6osfsbZz/0qf8A+f8A6p3pbfF6Mdkq8PVG+pscoYmMjjOSNjQ1jWscA1rRYAC2gAFk70tvi9GOyVeHqi7+8dJ659h/5J3pbfF6Mdkq8PVGyp5myNa9urXC46tCp0JqcVKO5keUXF4ZcWR4EBGeUSO9G8+q+M+bsv4lEvVmkyy0TLFyuj+xytUx1pTMOKZB6jIJAuF43sDMrm2dnmtWszDI5tnZ5prM9yeeZBfGwfSLR5usttLa0nxMZyxCT4JncAF0pwhVAEAQBAc/5Y4r01O/hNb2o3/0hXWg5YryXL90RLteFdTky6dvG8glbHgvNZcRhnuFlyLhNdcTySeDI5ger96x9ouJr8Q5keqvVJPzPMyMrAIA6to2DcZovc8E+4LReS1beb5M30U3JdT6DXDlwEAQBAEBr8ebenm/hJ8tfgol8s28+hut3irHqQFcgXpsMNwt04c4ODQDbUX6rqfZ2ErmLknjBGr3KpNLBmDZx3+YPZP5qX3LP419P5NHeC+EzP3V+uPJ35rDuSr/APRfT+THt/Ixq/AOZZnJDhcDS43+KjXejalvS9o55+RspXftJauDTVMbWgWFlWwk3vJkW2T/AA5mWKIcGNH2Qu5oR1aUVyRQ1HmbfMyVtMAgNJtpHmoqkcGg+y5p+Cj3SzSkTdHPFzDqcuwJ+Wppz/qMHm4D4qooPFSPU6m8WtQmuTOp1U8ULS+QtYwWBJ0Gu5XkpRgsy2HHU41KktWGWzFix6huPn4vMLV2ij8SJHYrr4GZv7eoP86LzC87TQ+JGPY7n4Ga3aLGaR9NM2OVjnltgAdTcj4LRc3FGVKSjJZwSbO0rxrxcotLJAcKZnq6Zv8Aqx+54KrbVZnHqdDdy1beb5M7MuiOKCAIAgCAh3KvFmoHu9WSJ3m7L+JWeh5YukuKf2I91/j+hzDY2uZT1kEsjgyMZw5x3AOjcOrtIXQ6RpSq28oxWXs+5Coy1Zps6n++GHf+0z7X5Lme7rr4GWHt6fEuQbYYdmH9pZ9rh3J3ddfAzx16fEz6farD5HNjZUMc9xDWgZrkk2A3cVrlY3EYuUoPCCr028Jmv5S5MtBIPWdGPth34VI0THN1H5/Y13jxSZzLYmPPiVIPrk+zG53wXQ6SeLSfy+6IdsvHE7uFxhbBAEAQBAY2IszRSjixw+yVqrrWpyXJmdN4mnzOchcSdASjZptoieLz9wC6fQ8cUG+bKi+f6mORYq8deyRzAxpDTa5v1KPcaWnTqSgorYbKVlGUFJszI9oX3ALG2vxKj09OTcknFbXxErNJbGbLHW3gf4HycFZ6UjrWs/l9yNbPFVEJrdbDvXJUlkuY7mdEjbYAcAu9isLBQPeel6eBAa7aGLPS1LeMUnnkNlrrLNNrkb7WWrWg+a+5xqlkyvY7g5p8iCqGDxJM7WqtaElyZ1PaOgdU08kLLB5ykZiQNHg6kA9QKvLim6lNxRx1lXVCupy3Ih8OxNZmHSh9t/8AQq12FXHl/fkXr0zQ4P0/JnfuRWetF7Tv6Fr7uq8V/fkY98UOD9PyYWLbN1FKznJDGW3Dei5xNz3tHBaq1nUpR1pY/vyN9vpGlXnqRTyYmykeavpxwcT7Mbj8FnZr9SJnpGWLWf8AfNHXVfHHhAEAQBARvlFhz4dVDgGO9mRjvgp2jZat1Dr90aa6zTZxCipzLJHECGl72sBO4Fzg0E26rldhUmqcHN+SyVqWXgl//jWs/wA2Dzk/oVT33R+F+n5JHZJcS5ByaVmYfOwecnD+BePTdH4X6fkO0m1vRucC2AqYKiCaSSJzGPDiGl9zbda7R12Ue60tTq0pQjF5ax5ClZyjNSbWw2HKxLalhb60w8hG/wCNlo0JHNdvl+6M75+BLmQ3kxizYi0+qyV3uDPxK00xLFr1a/voabReNdDtK5MswgCAIAgPL23BHHReSWVgI5la2i4ZrDwdGnlEtwBtoGdpcftFdXouOLaPz+5S3j/VZrKjBJ3ve4Zek4kdLib8FV1tF3E6kpbNrfmTIXlKMEtpmfsKf6vtf8KKtDXS4fX+DztdPmZFcysEb+cc0stra17eSlXMdIKjL2jWrjaaaboa61U8kdy5pYm8XNHm5VFosziua+5YSeIN8joQXdFCVQBAWqlmZj28WkeYsvJbUZReGmcJbuHcucO93k8O0leG5zRHIBmLula1r33braq07TWSzqHN932rlqqrtMWLbuW4+YZ7TvyWp6Qlj3SQ9Bw+N/Q3OD7Xy1E0UJia0PNiQ43FgT8FlQv5VKijq7yNc6LjRpSqa27kXuUN9oIhxkHuY5ZaSeKa6mGhlmu3y/BFtgmZq4H1WSO9wb+JRrBfqfIs9LvFtjmjqaujlQgCAIAgNTtZFnoqxvWYJbd4YSPeFItJateD5r7mFVZg+hwGlmLHxyN1c1zXDva4Ee8Lt6kVKDi/NMqU8PJ0er2qxaFjpJKBrGN1c4l1hrbXVc5DR9nOSjGrlsnOtVSy4mBBymVOYfMReb+HepPcdP436Gp3kl5Ei2T21nrahsD4o2NLXOJaXX6I7e0hQ77RkLelrqTe3BnQupVJ6rRjcrknRpGcTI7yDB+JbNBR8c3yRhfPZFGk5II71k7+ELh7UjP6SpWnH+jFc/2FmvE+h15cwWAQBAEAQBAc2rG5ZJBwe4eTiuKrrFSS5v7nQU3mCfI3FBiUjI2NbTveAN4zWOu/0Vb219Vp0oxjTbXH+og1beEptueP71KjaT/S+3/1Xr02/g9f4PO7/wDl6Gzi2gLnNbze8gelxNuCxpabc5qGpvaW/wDg1ys9VN6xmY660D+3KPtBTtKyxay+X3NNss1EROgbmqYR9Zp8tVzujo5rQXMtKzxRk+RPV2ZSBAEBRAcLrI8skjPVe9vk4hc7NYk1zO7ovWpxfJfY6jhbeeo4mn6cLWk97MpV5SWtRXNHH137O5k15S/cicmxFS1w5t7JRfruw+RuPeq6dhUW5p+heQ01Ra8Sa9SQ7O7JyU8rJ5JGktvZrQTvaW+kbceC221jKnNTkyBe6TjWpunCO/zZa5R5NKZvEvPkGj4rDSb2RXU2aFj4pvoank0ZepmdwiI9p7f6V5o9eNvkSdNvFGK5/sdKVsc0EAQBAEBYro88cjfWa4ebSFlB4kmeS3HzV9Hw+C+gbymO94hSCrpnxF2USx2zAXtmAN7da4SlU9jWU15Mt5R1oY4nP38m1W14EcsUjeLszCO9tj7iughpui14otepBnaT8mS/Y7Yt1DLz8kokfkLMrWkNGYtN8xNz6PAb1W3+k+0w1Ixws5NtC19nLWbNDyty3mpm8I3u9pwH4FO0FHwTfNGm+96KKcjEXTrX8Gwt8zIT9wWOnZbIR6/sbLNbWzqK54nFEBVAEAQFEBz7Gm2nmH1yfPX4rj75YuJrmXts80o9CRYG68EfZceTiuj0bLWto/QqrpYqs1NRgEoN2FrxfduO/t096qa+iK2W4NP0JlO+hjEthtKHBJA5j3loAINt5NjfuXlpoirCpGdRpYecbzVVuouLjEzNpHWiA4uA9xPwU3TUsW2OLX5NVp/kI7gLb1bOzMfJhVToqOa8fmTrp4osm660pwgKoAgOLbRR5KqqH+q8+04u+KoK6xUl1O1sZZt4PkhQY7VQACOVwaNzXWc3uAdu8F7TuKkNiZ5WsaFXbKO3juJBh+3UgIEsLXnixxb5g3UqOkGl4kVtXQkN9OWOv9RcrNtKp+kYZCOwZnebtPco89I1H7qS9TZS0PRj77b9DQV1fJKc00heerMb27h1eCiTnOo8yeSxpUKdJYgsEk5Lo+lVO7I2+95PwVpo9e8+n7lRpyXuLr+x0BWZz4QBAEAQBAfNlZFkkkZ6r3t9lxHwXfUpa1OMuKX2KaW9o2WG7UV1PYRzuLR9F9nttwAdew7rKNV0fb1fejt4rZ9jZGtOO5knw3lMmbpLTskdrYseWDd1gh33quqaDg34JtdVn8G7tkktqLOIcoFfLcMcynb9Rt3e0+/uAW+loe3h72Zdf4I8ryo92wi9fWySkvlkdI+1rvcXHuF9w7FZU6UKaxBYXI0Nyk8vadF5Go/mKp/GUN9ljT+Jc7px/qxXL92Wdp7r6nQ1SEsIAgCAIAgIJtKy1TJ25T9kfkuU0nHFy/kXVm80kY1JiMsQsx3R4EAhaqF7WorEHs4GdS3p1NsltNpTbRnTnGeLT8D+asqemn/7I/T+SHOw+F/Uzp9oXH0GBva439wWirp2T/xxx1/B5GyX+zNXV10kn94643gaAeSqq93WuPfeeXkSqdGMPdR72UbmqHHg1x8yB8VZ6Hj+vngvwa714pJcyZrpypCAIAgI/i+yFJUudI4OjkdqXMdvPaDce5RqlrTqPL3k+30lXopRTyl5MjFfyfTNuYJWyDg8Fh8xcH3KJOwkvdZaUtNweypHHQ0FXgNZARngfv0LRnb5suok7epHeixp31vU3TXz2fczKPZXEJ/8Pmm8ZCGfZF3e5ZwsqkvLHU01dJ21Pzz0/uDf0HJ23fPOXdkYAHtOvfyClw0ev9mV1XTc3/jjjqSvCMHgpGlsLcoNi4kkkkcSSptOlGmsRKmvc1K8tao8mwWw0BAEBRAVQFEBEcY5O6Coc94zwSOJcSx1wXE3JLX3G89VlZUNK3FJKOU0uJHnbQlt3ESxLkuqmawSxzjg4GN3hvB8wrOlpym/8kWum38GiVpJe6yM1ezeIQOAfSy33DKwyA9zmXCsoX1vUWVNfPZ9zRKjNbGjaYfsFik9i6MQNPXK4N+y258wFGq6Xtqe556GcbWb8iUYbyVQtsaiofJ9WNoYO4k3J9yraunKj/xxS67fwSI2i/2ZNsFwanomGKnZzbCcx1c4lxAFyXEm9gPJVFavUrS1qjyyRCEYLETYLUZhAEAQBAEBrMSwSGc5nZmvta7Tw7DooVzYUq71pb+JIpXM6awtxpKnZWQf3b2v7HdE/Efcquroea/xyz12EyF/F+8jU1OGzxenG4DiBceY0VfUs69P3ov7kmFenPcy/BQVUvoxuA4nojzK8paOrT3Rfz2GMq9KG9mxp9lXnWWQN7GjMfM2VlS0NL/eWOhGnfr/AFRvMNwiKnuWXLiLEk3NvuVrbWVK32w3kOrXnV942ClmkogKoAgCAogCAqgKICqAICiAqgCAIAgCAogCAIAgKoAgKICqAogKoAgKICqAIAgCAIAgCAIAgCAIAgCAIAgCAIDGqq+KL03gHhvPkNUBWlrYpfQeHdnX5HVAZCAICiAqgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAs1FVHGLvcG951PcOtAaau2oiYCWi4H0nHK336/cvG0t5lCEpvEVlkSxXbm9wHl3ZH0W+0dT71plcRW7aWtDQ1xU2y8K57/oaGlxOprJmQRWizm12i5AAJcSTwAJ6lpVac5YWwspaMtrWk6tTxY4/gwo9o6qne6OUCUsJBv0XadYcPPcs/ayi8MjPR9CtFThsySfCeUAaBzyzslGZvtjUeNltjWi95Aq6MrQ93b0JhQbUxSAFw0P0mEPb7v+VszkgSjKLw1g3NNVxy6seHdx18RvC9MS+gCAIAgCAIDEr69kIGa5J3AbytlOlKb2Ee4uYUVt3vyMWHG4ycrw6I/WGn/C2O2kllbehohpCm3qzTj1NoHA6jUKOTk8mDW4rFEcpJc71W6nx4LdToTmsrcRa15TpPD2vgjxSYs17gxzXRuO7N1r2dBxWsnlcjGjexnPUaafM2S0E0IAgCAIAgCAIAgCAIAgCAICjxcEbkByHaTFJoXNa0gFwJLiLuuDbr0UavVlDYi80TY0biLnU24e4i8875Dd7i89pv5cFDcm9501KjTpLEEl0La8Nh0DkzwqzZqtw3gxx9w1efOw8CpdtD/Y5rTtzlqiur/YjG2lBYsnaND0H949E+WngFlXj5mrRVfKdJ9V+5GFHLkuU9Q+M5o3OYeLSR523r1NrcYTpxmsSWSX7JYrUVEhjeQ6wBDrWdcuAGo049Sk0pyk8Mo9I2tKjFSgsZZ2YLeVIQBAEAQBAad4zVgvrlZcfrxUpbLfqyta1r1Z8omyqadkgyvaHD7u49Sjxk4vKJ1SlCpHElkjU874C+KKQmPja+S51AP681YRhGolOS2/coqlWdCUqVOXh+xvMLoYo2hzOmTrn6zfhwCh1aspvD+hbWtvTpxzHa358TG2iFhC8ekHi33/BbLXfJcjRpHYoTW9M3CilkEAQBAEAQBAEAQBAEAQBAEAQHH9vYcsjex8jfeCPuUS6W5nR6AltnHo/uRRRDoy7S075XsiYLve4Nb3k28kSy8GFSoqcHOW5HXcVmZhlCQz/DYI47/SedASO8lx8VYyapw2HF0YSvbrxeby+hEoyytptdA9tj9V4/JwXuycDW1K1uOj9Dn0sZY5zXCzmkgjgQbFQ2sPB1EZKSTR5XhkTTk0gzSuPF8Q8iXFSaC3spNMS9yPU7KpBShAEAQBAeZJA0XcQBxOgXqTexGMpKKy2R2pxFgqGyMvIMuUgdZ13cepToUZOi4y2bclNVuoK5VSG3ZjYXKrF5z0BEY3O0be+bXS4FgsYW9P3nLKRnVvqz8EYYb3cS3TUtUxjmCFhDvSzEEnxzLKdSlKWtrMxpUbmnBw1Ft35/7PNLVVFLaJzL5tWgnjwIv5L2cKdbxJ9TClWr2uKco5zuGJYiZDE2Rjosrg51+HZp3pRo6qbi87BdXXtHCM4uOHl5N/TVccguxwd947xvCgyhKLxJFxTrQqLMXkvrE2hAEAQBAEAQBAEAQBAEAQBAcv5SYbOeeEjT7TPzKj3K8OS60FLFw1xRBFBOsJryZYVnlfVOHRj6LP43DU+DT9tSbaGXrModOXOrBUVve19P+/se+U2vdJJHTMBLYxndYEgvcNB4N/3r25k21Ew0JSjCEqsmsvYuhH9jKtzHuhcCGu6Tbg6OA1HiP9qzoyw8EfSlKMoqpHetnyLe2dBkkbM0dF+jv4gPiPuK8rRw8mWi6+tB03vX2I6tBbHR+SqDc7i97vAMA+9S6C8JzulZZrJcEdSW4rAgCAIC3UShjXPO4AnyXsY6zwjCpNQi5PyNNS0bqq0s5OQ+iwHS368VKnUVLwQ3+bK2lQldfqVt3ki7jNE1sYdG0NLCHaDq6/gfBeUKjc8Se/YZ3tCMaWtTWNV5PGEtMjn1Umm8N7AN9vu80r+BKlH5mNmnUlK4n8uXEwJscmLrtIa3qFgdO0lSY2cEtu8hVNJ1XLMdi4Gxf/bIMwFpG3tb1h1DsIUZfoVceX7E9/8Al2+sl4l9/wCTHwnNUSmSQXDGhuu4k/o+azrpUoasfN5NNm5XFX2k/JY+ZmVmDt9OH5qQbraA+HV4LVC4e6e1EmrYxzr0vDLkXsIrHStIeLPacrvzWNamoS2bnuNlpXdWL1t62Mz1pJYQBAEAQBAEAQBAEAQBAEBz/lLh6Lz9VjvJ9vuC011mDLLREtW7jzyvQ5q1pJAAuToAN5J3AKvO0bSWWdmwqljw6jaJDYRsL5Tvu46uI466DwVlBKnDacLcVJ3dy3HzeF+xgu27w+x+cfuP+HJ+Sw7RAkdz3fw+qIr+9FJ67vYf+Sy9tA1923HD1RkVsLKynIabh4zMPBw3d2uh8VlJKcdhppTlbV/F5bznbgQSCLEaEcCOpQjqk01lHWeS6C0bD9Rx9qTT3KZSXgRzGkJZuJE/WwhBAEAQHieMPaWncQQfFeptPKMZxU4uL3M0sNRJSdCRpfF9F46uw/l96lyhGt4o7HwKuFSpaeCosx8mVxavbJG1kTg4vcG6bwO0bxrZeUaThPWmtxld3MalNRpvOs8FcMJhkfTP1B1YeIO8frgUrfqRVWPzPLVujUdvPquZiTbPyB1mFpb1XJBA7dFujeRxtW0jVNF1NbwNYM2oIpIBG03kdoOJJ3kDs/JaI/rVNZ7kS6mLShqQ3vd1Zj4ePksuR5Aa9gNzoAR2+Y8lsqv20NaK3M02y7LV1JvY1n5mTUYvnOSnaZH8baDt/Wi1Rt8eKpsRIqX2u9Sgsvj5Iy8KouZbYm73G7j2rXWqa8tm432lv7GGHve1matRKCAIAgCAIAgCAIAgCAIAgIhyhQ3jJ4xyD2QCPvWFRZiyVZS1biD5ohXJ9hrZqkSvtzcIz67i8+gNe4u/lChW8cyy/I6bTFw6dDUjvls+XmSHlMxYCGOnY4EyHM+xv0GbgbcXW9krfcz2apWaEtm6jqyW7d1ZzcqEdSzAW0riXbFV12vgcd3Tb3H0h56/zFSaEtmCj0rQ2qoujNdtfQ83LzjfQk17nDf56HxKwrRw8kvRtZzpaj3r7HUeT2DJCOxkTfsklSYLEUUNxLWqyfNksWRpCAIAgCAo4X0OoQNZI/V0Eb6lsTRkblu7Lprru6h1KdCrKNFye3aU1W2pzulBLCxnYXKjAnDpMlcS3Vodx7DfRYxulucd5nU0dL3ozeVuyY1PUSua9zqgxlvpNLRfw4rOcYKSShnJppVKsoOUquGt6weqPD5agCV8hb6ptrbiNdEqVoUvBFdT2ja1bhKpOTXApimGth5txc593gOzHeN/wK9o1pTyt2w8urSNLVk23t25JDDA1gs0Bo7BZQHJyeWXMKcYLEVguLwzCAIAgCAIAgCAIAgCAIAgCA12NYZ8pYG3sRe1xcG41BQ9TaeUcyx3Yx0ZuwZD1B2rD/C7q7j7lFnbecToLTTbXhrrPNb/AJoi09O6I5XtLHcCPu4qI4uLwzoaVaFWOtB5RbK8Nj3GCtpXF6ko5JnZY2F57Nw7SdwWUYt7jVVrQpLM3gmmzuwheQ6Qc4esboh3ne7u9xUiFFL3iluNKSlspLC4+Z1HCMOFOwtvmJNzpYbrWA4LeVJnIAgCAIAgCA01Q4R1bHO0a5lr9V/1bzUqPioNLyZW1H7O8UnuawZ1XiEUQ6ThfgNSfBaYUpTexEqtc06S8T+XmaSSilqS6YMDN2Vp3utx/NTFVhSWpnPPgVU7arct1sY4LibOgxZjug8c1INCDoPDh3KNUoNbY7UT6F5CXgn4ZcPwWMfkD+aiabuc8HThu+PuWdt4daT3JGq/kp6lNb2zdKKWYQBAEAQBAEAQBAEAQBAEAQBAEB5kja4FrgHA7wdQgI5jOykUwOUAj1Xbv5Xb2lYyipLDNtGvUoy1oPDOeYzspLCTkBP1HaO/lO5w/WqiztmtsTorXTcJLVrbHx8i3gWxckxHOgk+oz8b9w8PNZwo/ERLnSiWyl9f4OlYPstFC0BwFh9BujfE73H9aqQkluKadSU3mTyyQMaGgAAADcBoAvTA9IAgCAIAgCAIDHrKNkwyvFx1dRHcVnCpKDzE01qEK0cTRj02DwRm4bmP1tbeG5ZzuKklhs00rGjTeUsvmbBaSYY1XQxy+m0Ht3HzCzhUlD3WaatvTq++i1R4VDEczQc3Em9u5ZzrzmsM10bKlSetFbTOWklBAEAQBAEAQBAEAQBAEAQBAEAQBAEBaqKZkgyvaHDt+B6kBWCBkYysaGjgEBcQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAYWM4iykglqJL5I2lxA3uPU1o63E2AHEhAyA4ftDV0MVaajnXTOppa2P5Q14YKiNhdNTx3sTE3oFoBvbPwXpgsoz6za+rgdLDL8na8OpLTEPEELKoTWMwL7uymHLcOaHGRvooMspQ7dOLm886nbEfl45xriI3GlMPNljnOtZ7ZHutroNDYXLA1jBotrZ+nOXsZJPDhpY14c+Fkk8E8jg1pkYG3y73Pbew1JsCGcM2uBbWVNY6ly8xFG6B08z3ZnaR1BhcI7PsA4NJDiSG/WTATbI/TVUs0FPI+oE8Y+WvdCa6Sklc35bLzc7JGEc40MblAcQ0AjVA2dF2eq2z0tNMznMj4o3t53+9s5oIznrdxK8MkbFD0IAgCAIAgOV7Svn5/F5GmZoimp42TirqGR0gfTU5MjqdhyvY1zi91xY3N9LkemDN8Nr5/lksJbC2COR8RzPYJujT89zoHOZng9UbYz0elm0IQZeTXUm387xI3+zk5qQMm9GGNtWZbOla2V56IjFruaXGRoIZvTA1mbChxyo+XtbNWUppjTZ+hcRvc2WRjzG90hs4OAzb7DTf0iGXnaRmmq5TSUVRPOahjKGKSSIV8tJUscc7jUDK4c8XtAAzuAGTTeUPWdVw+UPiieM1nMa4ZxZ9i0HpDqdx7V4ZIyEAQBAEAQBAEAQBAEAQBAEAQHl7ARYgEduu43HvQFJImu0c0O37wDvFjv7NEBjYhhzJmlpL472u6NxY/o7gS3eNTobjXch5gt4dg0EDOba3MM7pCZCXudI8lznlzrnMSfDcNEGDKNLGRlLGkWAtlFrN3C3Z1IelTTR2IyNsQQdBqCbkHsugPMtHE8ND42PDfRDmtIb3AjRBgvoAgCAIAgCAIDwYm9LojpeloOlpbXjpogKcwzNnytz2tmsM1uF99kB5bSRAFojaARYjKLEXJsR1i5PmUGCklHE4AOjY4DQAtBAHYLaIMFZaSJ+UvjY8t9HM0HL3X3IMF5AEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQH/2Q==',
      content: 'Responsive design is key in frontend development to ensure accessibility across devices.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "dev_mike", text: "Awesome explanation!" },
        { avatar: "/api/placeholder/32/32", username: "web_queen", text: "This was really helpful!" }
      ]
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyBQbvKj_s7k3D3ZZeop4AN5so29A4Qic2Cw&s',
      content: 'Responsive design is key in frontend development to ensure accessibility across devices.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "dev_mike", text: "Awesome explanation!" },
        { avatar: "/api/placeholder/32/32", username: "web_queen", text: "This was really helpful!" }
      ]
    }
  ]);

  const handleCreatePost = (newPost) => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      likes: 0,
      dislikes: 0,
      isBookmarked: false,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDislike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
    ));
  };

  const handleAddComment = (postId, newComment) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, {
          avatar: "/api/placeholder/32/32",
          username: "user" + Math.floor(Math.random() * 1000),
          text: newComment
        }]
      } : post
    ));
  };

  return (
    <>
      <Navbar />
      <div className="frontend-container">
        <Sidebar /> {/* Add Sidebar here */}
        <div className="frontend-content">
          <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Create Post
          </button>
          <div className="frontend-features">
            {posts.map((post) => (
              <FrontendFeature
                key={post.id}
                image={post.image}
                content={post.content}
                likes={post.likes}
                dislikes={post.dislikes}
                isBookmarked={post.isBookmarked}
                comments={post.comments}
                onLike={() => handleLike(post.id)}
                onDislike={() => handleDislike(post.id)}
                onBookmark={() => handleBookmark(post.id)}
                onAddComment={(comment) => handleAddComment(post.id, comment)}
              />
            ))}
          </div>
          <CreatePostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreatePost}
          />
        </div>
      </div>
    </>
  );
};

export default FrontendComponent;
