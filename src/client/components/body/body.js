const BodyContainer = (children, titleText) => {
	return (
		<div
			className="body-container"
			// style={{ display: visible ? "block" : "none" }}
		>
			<h2 id="body-title">{titleText}</h2>
			{children}
		</div>
	);
};

export default BodyContainer;
