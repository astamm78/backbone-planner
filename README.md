backbone-skeleton
=================

Use the simple Python webserver to 'run' the app (make its resources available):  

```
python -m SimpleHTTPServer
```

Then you can access the index.html page via http://localhost:8000/  

Add templates to the index.html page like this:

```html
<script type="text/template" id="todo-template">
  Title: <%= title %> <button class="delete">Delete</button>
</script>
```
