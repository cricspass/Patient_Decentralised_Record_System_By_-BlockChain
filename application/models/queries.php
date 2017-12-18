<?php
	class queries extends CI_Model {
		
		public function getPosts() {

			$query = $this->db->get('patient_record') ;
			if($query->num_rows() > 0)
			{
				return $query->result() ;
			}
			
		}

		public function addPost($data)
		{

			//add it to the blockchain part
			//The URL with parameters / query string.
			$url = 'http://127.0.0.1:8085?name='.$data['title'].'&hospital='.$data['hospital'];
			$contents = file_get_contents($url);
			echo $url;

			return $this->db->insert('patient_record',$data) ;
		}

		public function getSinglePosts($id){
			$query= $this->db->get_where('patient_record', array('id'=> $id)) ;
			if($query->num_rows() > 0)
			{
				return $query->row() ;
			}

		}

		public function updatePost($data , $id)
		{

			$url = 'http://127.0.0.1:8085?name='.$data['title'].'&hospital='.$data['hospital'];
			$contents = file_get_contents($url);
			echo $url;

			return $this->db->where('id' , $id)->update('patient_record', $data ) ;
		}

		public function deletePosts($id)
		{
			return $this->db->delete('patient_record' ,['id' => $id]) ;
		}
	}


?>
