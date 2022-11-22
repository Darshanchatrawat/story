function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randColor = String(Math.floor(Math.random() * maxVal).toString(16));
    return `#${randColor.toUpperCase()}`
}
const nameGenerator = (name) => {
    return String(name).split(" ").map((data) => data[0]).join("");
}
const AvatarCustom = ({ name,color, style,className }) => {
    return <span style={{ "borderRadius": "100%", "color": "white", "backgroundColor": color || "var(--primary-color)", "height": "40px", "width": "40px", "textAlign": "center", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontWeight": "600", "fontSize": "0.875rem", ...style }} className={className}>{nameGenerator(name)}</span>;
}


export {
    generateRandomColor,
    nameGenerator
}
export default AvatarCustom;
