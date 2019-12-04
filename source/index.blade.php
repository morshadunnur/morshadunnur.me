@extends('_layouts.master')

@section('body')
    <div class="p-6 flex items-center justify-center min-h-screen">
        <div class="md:flex">
            <div class="md:ml-6 md:mt-0">
                <h1>Md. Morshadun Nur</h1>
                <h4 class="my-0">Full-Stack Developer</h4>
                <div class="mt-6 max-w-2x1">
                    <p class="mb-6">This is where you can give a little more information about yourself or site. If you'd like to change the structure of this page, you can find the file at <code>source/about.blade.php</code></p>

                    <p class="mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum officia dolorem accusantium veniam quae, possimus, temporibus explicabo magni voluptas. fugit natus deserunt atque veniam possimus earum harum itaque est!</p>

                    <p class="mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum officia dolorem accusantium veniam quae, possimus, temporibus explicabo magni voluptas. fugit natus deserunt atque veniam!</p>
                </div>
            </div>
            <img src="/assets/images/profile.jpg"
                 alt="Profile image"
                 class="flex rounded-full h-64 w-64 bg-contain mx-auto md:float-right my-6 md:ml-10">
        </div>
    </div>


@stop
