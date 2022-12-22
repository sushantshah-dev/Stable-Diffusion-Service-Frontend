all_files = [];

document.getElementById('file').addEventListener('change', function (e) {
    e.preventDefault();
    //shyow all images as selected in the file input
    var files = document.getElementById('file').files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        all_files.push(file);
        var img = document.createElement('img');
        img.src = window.URL.createObjectURL(file);
        img.height = 128;
        img.width = 128;
        img.onload = function () {
            window.URL.revokeObjectURL(this.src);
        }
        document.getElementById('images').appendChild(img);
    }
});

document.getElementById('add-image').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('file').click();
});

document.getElementById('upload').addEventListener('click', function (e) {
    e.preventDefault();
    
    for (var i = 0; i < all_files.length; i++) {
        var file = all_files[i];
        var formData = new FormData();
        formData.append('file', file);
        fetch('/upload', {
            method: 'POST',
            body: formData
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        });
    }
});