<!-- pageNum: 哪一页的；index: 数据的index是多少 
	这样做可以避免数据每一条都遍历查找，影响了性能
 -->

<div class="news-item type-0" 
	data-page="{{pageNum}}" 
	data-index="{{index}}">
	<h1>{{title}}</h1>
	<div class="info">
		<span class="author">{{author}}</span>
		<span class="date">{{date}}</span>
	</div>
</div>