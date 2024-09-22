async function get_article_content(article_name, target_element){
    try {
        // Fetch the content of the file
        let response;
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            response = await fetch("../articles/" + article_name + ".html");
        } else {
            response = await fetch("https://greaterthan000.github.io/ControlsToRemember/articles/" + article_name + ".html");
        }
       
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Get the text content from the response
        const text = await response.text();

        // populate the target element with the content
        target_element.innerHTML = text;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}