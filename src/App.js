//import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageURL, setimageURL] = useState("");
	const [applyURL, setapplyURL] = useState("");
	const [blogs, setBlogs] = useState([]); //idk what to put in here

	const blogDisplay = blogs.map((blog, i) => (
		<div key={i} class="displayBlogs">
			<p>{blog.title}</p>
			<p>{blog.description}</p>
			<img src={blog.imageURL} alt=""></img>
			{/*Need to change tag for img with src to link*/}
			<a href={blog.applyURL}>Link to apply</a>
			{/*Need to change tag for a with link inside*/}
		</div>
	));
	useEffect(() => console.log(blogs), [blogs]);
	useEffect(() => fetchBlogs(), []);
	function fetchBlogs() {
		fetch("http://localhost:4000/blogs")
			.then((request) => request.json())
			.then((data) => setBlogs(data));
	}
	function clicked() {
		const Blog = { title, description, imageURL, applyURL };
		console.log(Blog);
		fetch("http://localhost:4000/blog", {
			method: "POST",
			//mode: "same-origin",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:4000/blogs",
			},

			body: JSON.stringify(Blog),
		}).then((response) => {
			console.log(response);
			fetchBlogs();
		});
		setTitle("");
		setDescription("");
		setimageURL("");
		setapplyURL("");
	}
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div id="inputBoxes">
					<div>
						<label>
							Title:
							<input
								type="text"
								name="title"
								onChange={(e) => setTitle(e.target.value)}
								value={title}></input>
						</label>
					</div>
					<div>
						<label>
							Description:
							<input
								type="text"
								name="description"
								onChange={(e) => setDescription(e.target.value)}
								value={description}></input>
						</label>
					</div>
					<div>
						<label>
							Url for Image:
							<input
								type="text"
								name="imageURL"
								onChange={(e) => setimageURL(e.target.value)}
								value={imageURL}></input>
						</label>
					</div>
					<div>
						<label>
							Url to Apply:
							<input
								type="text"
								name="applyURL"
								onChange={(e) => setapplyURL(e.target.value)}
								value={applyURL}></input>
						</label>
					</div>
					<button
						onClick={() => {
							clicked();
						}}>
						Make a blog
					</button>
				</div>
			</form>
			{blogDisplay}
		</div>
	);
}

export default App;
