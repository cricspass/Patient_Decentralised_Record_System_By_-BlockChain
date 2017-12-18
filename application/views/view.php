<?php include_once('header.php') ;?>
	<div class="container">
		<h3> View Patient Record</h3>
			<h4> <?php echo $post->title ; ?> </h4>
			<p> <?php echo $post->description ; ?></p>
			
			<p> <?php echo $post->disease ; ?></p>
			<p> <?php echo $post->doctor ; ?></p>
			<p> <?php echo $post->hospital ; ?></p>
		<?php echo anchor('welcome', 'Back' ,['class'=>'btn btn-default']); ?>


	</div>

<?php include_once('footer.php') ;?>