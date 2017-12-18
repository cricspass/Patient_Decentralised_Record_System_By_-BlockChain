<?php include_once('header.php'); ?>
	<div class="container">
		
  		<?php echo form_open('welcome/save', ['class'=>'form-horizontal']) ; ?>
  		<fieldset>
		    <legend>Add Patient</legend>


		    <div class="form-group">
		      <label for="exampleInputEmail1">Name</label>

		      <div class="col-md-5">
		      <?php  echo form_input(['name'=>'title' , 'placeholder'=>'Title', 'class'=>'form-control']) ;?>
		  		</div>
		      <div class="col-md-5">
				<?php echo form_error('title', '<div class="text-danger">','</div>') ;?>
			</div>
			</div>
			
		      

		    <div class="form-group">
		      <label for="exampleTextarea">Description</label>
		      <div class="col-md-5">
		      <?php  echo form_textarea(['name'=>'description' , 'placeholder'=>'Description', 'class'=>'form-control']) ;?>
		  		</div>

		      <div class="col-md-5">
				<?php echo form_error('description', '<div class="text-danger">','</div>') ;?>
		      </div>
		    </div>
		    
			
			<div class="form-group">
		      <label for="exampleInputTextarea">Disease</label>

		      <div class="col-md-5">
		      <?php  echo form_input(['name'=>'disease' , 'placeholder'=>'Disease', 'class'=>'form-control']) ;?>
		  		</div>
		      <div class="col-md-5">
				<?php echo form_error('disease', '<div class="text-danger">','</div>') ;?>
			</div>
			</div>


			<div class="form-group">
		      <label for="exampleInputarea">Doctor</label>

		      <div class="col-md-5">
		      <?php  echo form_input(['name'=>'doctor' , 'placeholder'=>'doctor', 'class'=>'form-control']) ;?>
		  		</div>
		      <div class="col-md-5">
				<?php echo form_error('doctor', '<div class="text-danger">','</div>') ;?>
			</div>
			</div>
			
			<div class="form-group">
		      <label for="exampleInputarea">Hospital</label>

		      <div class="col-md-5">
		      <?php  echo form_input(['name'=>'hospital' , 'placeholder'=>'hospital', 'class'=>'form-control']) ;?>
		  		</div>
		      <div class="col-md-5">
				<?php echo form_error('hospital', '<div class="text-danger">','</div>') ;?>
			</div>
			</div>


		    <?php echo form_submit(['name'=>'submit' , 'value'=>'submit' , 'class'=>'btn btn-primary']); ?>
		    <?php echo "<br /><br /><br />" ;?>
		    <?php echo anchor('welcome', 'Back' ,['class'=>'btn btn-default']); ?>

		    <br />
		    <br />

		 </fieldset>
		 <?php echo form_close(); ?>
    
	</div>
<?php include_once('footer.php') ;?>