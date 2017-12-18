<?php include_once('header.php'); ?>
	<div class="container">
		<h3>View All Patients </h3>
		<?php 
			if($msg =$this->session->flashdata('msg')) :
				echo $msg ;

			endif ;


		?>
		<?php echo anchor('welcome/create' , 'Add Patient' , ['class'=>'btn btn-primary']);  echo "<br />" ;?>

		<table class="table table-striped table-hover table-bordered">
			  <thead class="thead-dark">
			    <tr>
			      <th>Title</th>
			      <th>Description</th>
			      <th>Creation Date</th>
			      <th>Disease</th>
			      <th>Doctor</th>
			      <th>Hospital</th>
			      <th>Actions</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<?php  if(count($posts)) :?>
			  		<?php foreach($posts as $post) :?>
				    <tr>
				      <td><?php echo $post->title ;?></td>
				      <td><?php echo $post->description ;?></td>
				      <td><?php echo $post->date_created ;?></td>
				      <td><?php echo $post->disease ;?></td>
				      <td><?php echo $post->doctor ;?></td>
				      <td><?php echo $post->hospital ;?></td>





				      <td>
				      	<?php echo anchor("welcome/view/{$post->id}" , 'View' , ['class'=>'badge badge-primary']); ?>
				      	<?php echo anchor("welcome/update/{$post->id}" , 'Update' , ['class'=>'badge badge-success']);?>
				      	<?php echo anchor("welcome/delete/{$post->id}" , 'Delete' , ['class'=>'badge badge-danger']);?>


				      </td>
				    </tr>
				   <?php endforeach ;?>
				<?php else : ?>
					<tr>
						<td> No records Found ! </td>
					</tr>
				<?php endif ;?>
			    
			  </tbody>
		</table> 

	</div>
<?php include_once('footer.php'); ?>