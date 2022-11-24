//import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState,useRef } from "react";


function App() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageURL, setimageURL] = useState("");
	const [applyURL, setapplyURL] = useState("");
	const [blogs, setBlogs] = useState([]); //idk what to put in here
	const errorMessage = "Please input both a title and description"
	let inputRef = useRef(null);
	const blogDisplay = blogs.map((blog, i) => {
		let colorDecide = "title";
		if (i % 2 === 0) colorDecide += " titleTeal";
		else colorDecide += " titleMagenta";
		return (
			<div key={i} class="displayBlogs">
				<div class={colorDecide}>{blog.title}</div>
				<div id="imageAnddescription">
					<p>{blog.description}</p>
					<img
						id="image"
						src={blog.imageURL}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src =
								"https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
						}}
						alt=""></img>
				</div>
				{/*Need to change tag for img with src to link*/}
				<a href={blog.applyURL}>Link to apply</a>
				{/*Need to change tag for a with link inside*/}
			</div>
		);
	});
	useEffect(() => console.log(blogs), [blogs]);
	useEffect(() => fetchBlogs(), []);
	function fetchBlogs() {
		fetch("http://localhost:4000/blogs")
			.then((request) => request.json())
			.then((data) => setBlogs(data));
	}
	function clicked() {
		if (title === "" || description === ""){
			console.log("sdfgdgdfgfd")
			setTitle("");
			setDescription("");
			setimageURL("");
			setapplyURL("");
			inputRef.current.innerHTML = errorMessage;
		}

		else{
			inputRef.current.innerHTML = "";
			const Blog = { title, description, imageURL, applyURL };
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
		
	}
	return (
		<div>
			<div id = "bigword">Resources</div>
			<div class="dropup">
				<img
					src="https://static.thenounproject.com/png/1406946-200.png"
					id="dropupImage"
					alt=""></img>
				<div class="dropup-content">
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}>
						<div id="inputBoxes">
							<div>
								<label>
									Title: <span id="red">*</span>
									<br></br>
									<input
										
										id="titleBox"
										type="text"
										name="title"
										onChange={(e) => setTitle(e.target.value)}
										value={title}></input>
								</label>
							</div>
							<div>
								<label>
									Description: <span id="red">*</span>
									<br></br>
									<textarea
									
										id="desBox"
										type="text"
										name="description"
										onChange={(e) => setDescription(e.target.value)}
										value={description}></textarea>
								</label>
							</div>
							<div>
								<label>
									Url for Image:<br></br>
									<input
										id="logoBox"
										type="text"
										name="imageURL"
										onChange={(e) => setimageURL(e.target.value)}
										value={imageURL}></input>
								</label>
							</div>
							<div>
								<label>
									Url to Apply:<br></br>
									<input
										id="linkBox"
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
						<div ref ={inputRef}></div>
					</form>
				</div>
			</div>
			<div>{blogDisplay}</div>
			<div class="animation-area Fixed">
				<ul class="box-area">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	);
}

export default App;
